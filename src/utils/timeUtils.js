// import momentInstance from 'moment'
// 这里不使用 moment 使用 dayjs 更加 轻量 2kb
import * as momentInstance from 'dayjs'
import 'dayjs/locale/zh-cn'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'
momentInstance.extend(weekOfYear)
const lang = window.navigator.language

const weekLists = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

momentInstance.locale(lang.toLowerCase())
// 获取今天开始时间戳
export function getTodayStart() {
  return momentInstance().startOf('day').valueOf()
}
// 获取今天结束时间戳
export function getTodayEnd() {
  return momentInstance().endOf('day').valueOf()
}

// 获取本月的第一天
export function getDate(number = 1, time = momentInstance()) {
  return momentInstance(time).set('date', number)
}

// 获取 ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
export function getTimeInWeekday(time = momentInstance(new Date())) {
  return weekLists[momentInstance(time).day()]
}

// 当天是周几
export function getTimeInWeekdayNumber(time = momentInstance(new Date())) {
  return momentInstance(time).day()
}

// 获取时间在一年中的第几周
export function getTimeInWeek(time = momentInstance(new Date())) {
  return momentInstance(time).week()
}

// 获取明天,后天,昨天
export function getDiffTime(type = 'YYYY年MM月DD日 HH:mm:ss', diff = 0) {
  return momentInstance().add(diff, 'day').format(type)
}

// 获取今年有几天
export function getYearNumber() {
  return momentInstance().endOf('year').diff(momentInstance().startOf('year'), 'days') + 1
}

// 获取本月有几天
export function getMonthNumber(time = momentInstance(new Date())) {
  return momentInstance(time).daysInMonth()
}
// 获取实例
export function moment() {
  return momentInstance(...arguments)
}

export default {
  moment,
  // 获取今天开始时间戳
  getTodayStart,
  // 获取今天结束时间戳
  getTodayEnd,
  // 获取本月的第一天
  getDate,
  // 获取 ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  getTimeInWeekday,
  // 当天是周几
  getTimeInWeekdayNumber,
  // 获取时间在一年中的第几周
  getTimeInWeek,
  // 获取明天,后天,昨天
  getDiffTime,
  // 获取今年有几天
  getYearNumber,
  // 获取本月有几天
  getMonthNumber
}
