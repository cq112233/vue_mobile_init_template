const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const WebpackBar = require('webpackbar')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const vantTheme = path.resolve(__dirname, './src/assets/theme/index.less')
const isDev = process.env.NODE_ENV === 'development' // 是否是生产环境或测试环境
const appConfig = require('./app.config.js')
const productionGzipExtensions = ['js', 'css'] // 压缩的文件类型
console.log('~~开始打包咯😁,请耐心等待~~')
// 合并对象属性
function mergeObj(obj1, obj2) {
  if (!obj2) {
    if (!obj1) {
      const obj = Object.create(null)
      obj.link = []
      obj.script = []
      return obj
    } else {
      return obj1
    }
  }
  for (const key in obj2) {
    if (Object.hasOwnProperty.call(obj2, key)) {
      const element = obj2[key]
      if (obj1[key] && obj1[key].length) {
        obj1[key] = [...new Set(obj1[key].concat(element))]
      } else {
        obj1[key] = []
        obj1[key] = Array.from(new Set(obj1[key].concat(element)))
      }
    }
  }

  return obj1
}
module.exports = {
  // eslint 关闭
  lintOnSave: false,
  // publicPath:'./',
  // rem 适配
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem-exclude')({
            remUnit: 75, // 根据设计图
            // 375的图就给37.5，也就是1rem=37.5px
            // 如果不想px装rem  可以使用 "PX"或者"Px"
            exclude: /node_modules|init.css/i
          })
        ]
      }
    }
  },
  // 全局引入 less 变量配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, `${vantTheme}`)]
    }
  },
  devServer: {
    // hot: true,
    proxy: {
      '/api': {
        // 这里最好有一个 /
        target: 'http://localhost:8080/', // 服务器端接口地址
        ws: true, // 如果要代理 websockets，配置这个参数
        // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/gateway': {
        target: 'http://newapi.zhihuishitang.net',
        changeOrigin: true
      },
      '/report': {
        // target: 'http://192.168.1.181:8302',
        target: 'https://test-api-report.zhihuishitang.net',
        changeOrigin: true
      },
      '/attendance': {
        target: 'http://192.168.1.235:8500',
        changeOrigin: true
      }
    },
    // 静态资源目录
    contentBase: './public',
    // gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    // 热更新，不需要刷新浏览器 大大提高开发速度    hot 跟 hotOnly  hotOnly 热替换失败不会自动刷新便于找到问题
    hotOnly: true,
    // 开启
    open: false
  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  chainWebpack: (config) => {
    // html 模板变量操作  hbs模板好用
    config.plugin('html').tap((args) => {
      args[0].cdn = mergeObj(
        appConfig.cdn && appConfig.cdn[process.env.NODE_ENV],
        appConfig.cdn && appConfig.cdn.common
      )
      return args
    })
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        // { bypassOnDebug: true }
        mozjpeg: { progressive: true, quality: 65 }, // Compress JPEG images
        optipng: { enabled: false }, // Compress PNG images
        pngquant: { quality: [0.65, 0.9], speed: 4 }, // Compress PNG images
        gifsicle: { interlaced: false } // Compress SVG images
        //					webp: { quality: 75 }
      })
      .end()
    // 修复HMR
    config.resolve.symlinks(true)
  },
  configureWebpack: (config) => {
    if (!isDev) {
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    }
    if (!isDev) {
      config.plugins.push(
        // 生产环境自动删除console
        ...[
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_debugger: true,
                drop_console: true
              }
            },
            sourceMap: false,
            parallel: true
          }),
          // gizp 在前端压缩,减少服务端压力
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
            algorithm: 'gzip', // 使用gzip压缩
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ), // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            minRatio: 0.8 // 压缩率小于0.8才会压缩
          })
        ]
      )
    }
    // 开启了dll
    if (appConfig.isOpenDll && isDev) {
      config.plugins.push(
        ...[
          new webpack.DllReferencePlugin({
            manifest: path.resolve(
              __dirname,
              'public/dll/vendor-manifest.json'
            )
          }),
          // 这个主要是将生成的vendor.dll.js文件加上hash值插入到页面中。
          new AddAssetHtmlPlugin([
            {
              filepath: path.resolve(__dirname, 'public/dll/vendor.dll.js'),
              includeSourcemap: false,
              hash: true
            }
          ])
        ]
      )
    }
    config.plugins.push(
      ...[
        // 添加 进度条
        new WebpackBar()

      ]
    )

    if (process.env.NODE_ENV === 'production' && process.env.analyz === 'analyz') {
      config.plugins.push(
        new BundleAnalyzerPlugin(
          {
            analyzerMode: 'server',
            analyzerHost: '0.0.0.0',
            analyzerPort: 8889,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
          }
        )
      )
    }

    // 源代码跟踪
    config.devtool = !isDev ? 'cheap-module-source-map' : 'source-map'
    return {
      resolve: {
        alias: {
          '~': path.resolve(__dirname)
        },
        extensions: ['.ts', '.tsx', '.js', '.json', '.vue', '.css', '.less'],
        modules: [
          'node_modules',
          path.resolve(__dirname, 'src/components/common'),
          path.resolve(__dirname, 'src/components/project')
        ]
      },
      module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
      },
      // 使用cdn 加载 web将不打包   用dll 处理node_moodle 中的模块
      externals: {
        // vue: 'Vue',
        // vant: 'vant',
        // axios: 'axios',
        // 'vue-i18n': 'VueI18n'
      }
    }
  }
}
