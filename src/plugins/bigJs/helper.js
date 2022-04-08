import Big from 'big.js'

// 加
export function bigAdd(x, y) {
  const temp = Big(x)
  const o = temp.plus(y)
  o.bigAdd = bigAdd.bind(o, o.toNumber())
  o.bigMinus = bigAdd.bind(o, o.toNumber())
  o.bigTimes = bigAdd.bind(o, o.toNumber())
  o.bigtDiv = bigAdd.bind(o, o.toNumber())
  return o
}

// 减
export function bigMinus(x, y) {
  const temp = Big(x)
  const o = temp.minus(y)
  o.bigAdd = bigAdd.bind(o, o.toNumber())
  o.bigMinus = bigAdd.bind(o, o.toNumber())
  o.bigTimes = bigAdd.bind(o, o.toNumber())
  o.bigtDiv = bigAdd.bind(o, o.toNumber())
  return o
}

// 乘
export function bigTimes(x, y) {
  const temp = Big(x)
  const o = temp.times(y)
  o.bigAdd = bigAdd.bind(o, o.toNumber())
  o.bigMinus = bigAdd.bind(o, o.toNumber())
  o.bigTimes = bigAdd.bind(o, o.toNumber())
  o.bigtDiv = bigAdd.bind(o, o.toNumber())
  return o
}

// 除
export function bigtDiv(x, y) {
  const temp = Big(x)
  const o = temp.div(y)
  o.bigAdd = bigAdd.bind(o, o.toNumber())
  o.bigMinus = bigAdd.bind(o, o.toNumber())
  o.bigTimes = bigAdd.bind(o, o.toNumber())
  o.bigtDiv = bigAdd.bind(o, o.toNumber())
  return o
}
