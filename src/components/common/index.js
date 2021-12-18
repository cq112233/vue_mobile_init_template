// 全局注册组件
import Vue from 'vue'
// 魔法注释勿删 ⬇️
/** plop import common compontent **/

const arrComponents = []
arrComponents.push(
  // 魔法注释勿删 ⬇️
  /** plop import common compontent name **/

)

const components = {
  install: () => {
    for (let index = 0; index < arrComponents.length; index++) {
      const element = arrComponents[index]
      Vue.component(element.name, element)
    }
  }
}
Vue.use(components)
