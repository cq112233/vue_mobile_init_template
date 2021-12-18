/**
@params 操作 dom 工具
*/
// 创建 dom 元素
export const createElement = (el) => {
  return document.createElement(el)
}
// 获取 dom 元素
export const getElementDom = (el) => {
  return document.querySelector(el)
}
// 获取 多个dom元素
export const getElementDoms = (el) => {
  return document.querySelectorAll(el)
}
// 获取html dom
export const getHtmlDom = () => {
  return document.documentElement
}
// 获取html body
export const getBodyDom = () => {
  return document.body
}
// 设置 dom 属性
export const setAttr = (dom, attr, content) => {
  dom.setAttribute(attr, content)
  return dom
}
// 移除 dom 属性
export const removeAttr = (dom, attr) => {
  dom.removeAttribute(attr)
  return dom
}
// 设置 dom 样式
export const setStyle = (dom, obj) => {
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key]
        dom.style[key] = element
      }
    }
  }
  return dom
}
// 获取父节点
export const getFatherNode = (id) => {
  return getElementDom(id).parentNode
}
// 获取子节点
export const getChildNode = (id) => {
  return getElementDom(id).childNodes
}
// 添加子节点
export const addChildNode = (id, childNode) => {
  return getElementDom(id).appendChild(childNode)
}
// 删除子节点
export const removeChildNode = (id, childNode) => {
  return getElementDom(id).removeChild(childNode)
}

export default {
  createElement,
  getElementDom,
  getElementDoms,
  getHtmlDom,
  getBodyDom,
  setAttr,
  removeAttr,
  setStyle,
  getFatherNode,
  getChildNode,
  addChildNode,
  removeChildNode
}
