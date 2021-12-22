const path = require('path')
const webpack = require('webpack')
const appConfig = require('./app.config.js')
let dll = []
if (appConfig.isOpenDll) {
  dll = appConfig.dll
} else {
  throw new Error('请将app.config.js中isOpenDll设置为true😺')
}
module.exports = {
  entry: {
    vendor: dll// 这里是需要缓存的模块和插件
  },
  output: {
    path: path.join(__dirname, 'public/dll'), // 放在项目的static/js目录下面
    filename: '[name].dll.js', // 打包文件的名字
    library: '[name]_[hash:10]' // 可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'public/dll/[name]-manifest.json'), // 生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_[hash:10]'
      // context: __dirname
    })
    // 压缩 只是为了包更小一点
  ],
  mode: 'production' // development || production   可以在--mode=  层级更高指定
}
