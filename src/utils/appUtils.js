/**
@params app 全局工具
*/
import { getHtmlDom, setAttr } from '@/utils/domUtils'
/**
@return true为pc false为 phone
*/
export function isPc() {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
  * 切换主题函数
  */
export function changeTheme(themeValue) {
  if (!themeValue) {
    setAttr(getHtmlDom(), 'class', `theme-defualt`)
    return 'defualt'
  }
  setAttr(getHtmlDom(), 'class', `theme-${themeValue}`)
  return themeValue
}
