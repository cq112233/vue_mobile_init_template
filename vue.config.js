const path = require('path')
const vantTheme = path.resolve(__dirname, './src/assets/theme/index.less')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  // eslint 关闭
  lintOnSave: false,

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
    hot: true,
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
    }
  },

  chainWebpack: config => {
  // 修复HMR
    config.resolve.symlinks(true)
  },
  // cdn 映入window全局挂载,打包忽略
  configureWebpack: config => {
    if (isProduction) {
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
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    }
    config.devtool = isProduction ? 'cheap-module-source-map' : 'source-map'
    return {
      resolve: {
        alias: {
          '~': path.resolve(__dirname)
        },
        extensions: ['.ts', '.tsx', '.js', '.json', '.vue', '.css', '.less'],
        modules: ['node_modules', path.resolve(__dirname, 'src/components/common'), path.resolve(__dirname, 'src/components/project')]
      },
      module: {
        rules: [
          { test: /\.ts$/, loader: 'ts-loader' }
        ]
      },
      // 使用cdn 加载 web将不打包
      externals: {
        // vue: 'Vue',
        // vant: 'vant',
        // axios: 'axios',
        // 'vue-i18n': 'VueI18n'
      }
    }
  }
}
