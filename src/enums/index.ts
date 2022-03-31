export enum TradingStatus {
  CONNECTING = 0, // 连接中
  OPEN = 1, // 开启中
  CLOSING = 2, // 关闭中
  CLOSED = 3 // 关闭
}

export default {
  TradingStatus
}



function fn(x:any):any {
  return x
}

let y = fn([1,2,3])

function dealArr(x:Array<number>):Array<number> {
  return x
}

dealArr(y)