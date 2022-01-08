
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // 指定样式路径
      style: (name) => {
        return `${name}/style/less`
      }
    }, 'vant']
  ]
}
