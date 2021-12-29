enum WsStatus {
   CONNECTING = 0, // 连接中
   OPEN = 1, // 开启中
   CLOSING = 2, // 关闭中
   CLOSED = 3 // 关闭
}
interface Options {
  url:string,
  openHookFn:Function,
  messageHookFn:Function,
  closeHookFn:Function,
  errorHookFn:Function,
  resetHookFn:Function
}
interface WsGeneratorInterface {
  // testText:number = 1
  ws:WebSocket
  url:string
}
class WsGenerator implements WsGeneratorInterface{
  public ws:WebSocket
  public url:string
  private sendQueues:any[] = [] //函数事件队列
   // 心跳机制
  private interval:number = 500
  private serverTimeout:number = 3000
  private intervalTimer:any  = null
  private serverTimer:any  = null
  private openHookFn:Function
  private messageHookFn:Function
  private closeHookFn:Function
  private errorHookFn:Function
  private resetHookFn:Function
  private receiver:Function
  private isReconnect:boolean = false
  public Option:Options
  private delayConnectTime:any = null
  static instance:WsGenerator

  private constructor(Option:Options) {
    this.Option = Option
    this.url = Option.url || 'ws://47.242.25.96:10000/websocket/quote?_=1607675853653&_s=d1e829d321b235cbc31a0539cd5a986d'
    this.openHookFn = Option.openHookFn ?  Option.openHookFn:()=>{ console.log('ws开启钩子') }
    this.messageHookFn = Option.messageHookFn ?  Option.messageHookFn:()=>{  console.log('ws接受钩子') }
    this.closeHookFn = Option.closeHookFn ?  Option.closeHookFn:()=>{ console.log('ws关闭钩子')}
    this.errorHookFn = Option.errorHookFn ?  Option.errorHookFn:()=>{ console.log('ws错误钩子') }
    this.createWs()
  }
  // 懒汉模式 单列
  static getInstance(Option:Options):WsGenerator {
    if(!WsGenerator.instance) {
      WsGenerator.instance = new WsGenerator(Option)
    }
    return WsGenerator.instance
  }
  private bindWs():void {
    this.ws.onopen = this.onOpen.bind(this)
    this.ws.onmessage = this.onMessage.bind(this)
    this.ws.onclose = this.onClose.bind(this)
    this.ws.onerror = this.onError.bind(this)
  }
  // 心跳机制
  private setHearBeat():void {
        this.intervalTimer && clearTimeout(this.intervalTimer)
        this.serverTimer && clearTimeout(this.serverTimer)
        this.intervalTimer = setTimeout(() => {
          // 这里发送一个心跳，后端收到后，返回一个心跳消息，
          // onmessage拿到返回的心跳就说明连接正常
          this.ws.send(JSON.stringify({ sub: 'ping' }))
          this.serverTimer = setTimeout(() => {
            this.ws.close()
          }, this.serverTimeout)
        }, this.interval)
  }
  private onOpen():void {
    this.openHookFn()
    this.sendMsg()
    this.setHearBeat()
  }
  private onMessage(e:any):void {
    this.messageHookFn()
    this.setHearBeat()
    if(this.receiver){
      this.receiver(e)    
    }
  }
  private onClose():void {
    this.closeHookFn()
    this.resetWs()
  }
  private onError():void {
    this.errorHookFn()
    this.resetWs()
  }
  // 创建ws
  private createWs():void {
      if ('WebSocket' in window) {
        this.ws = new WebSocket(this.url)
        this.bindWs()
      } else {
        alert('Not support websocket')
      }
  }

  // 重连ws
  private resetWs():void {
      console.warn('重新连接')
      if (this.isReconnect) return
      this.isReconnect = true
      // 没连接上会一直重连，设置延迟避免请求过多
      this.delayConnectTime && clearTimeout(this.delayConnectTime)
      this.delayConnectTime = setTimeout(() => {
        this.createWs()
        this.isReconnect = false
        this.resetHookFn()
      }, 4000)
  }
  // 依次发送事件队列
  private sendMsg():void{
    this.sendQueues.forEach(v =>{
      this.ws.send(v)
    })
    this.sendQueues = []
  }
  // 发送信息
  public send(msg:any):void  {
    if(msg instanceof Array) {
      msg.forEach(v =>{
         this.sendQueues.push(JSON.stringify(v))
      })
    }else {
      this.sendQueues.push(JSON.stringify(msg))
    }
    if(this.ws.readyState !== WsStatus.CONNECTING){
      this.sendMsg()
    }
  }
  // 获取数据
  public getMessage(receiver:any) :void{
    this.receiver = receiver
  }
  // 设置重启钩子
  public setResetHookFn(receiver:any) {
    this.resetHookFn = receiver
  }
  // 设置开启钩子
  public setOpenHookFn(receiver:any) {
    this.openHookFn = receiver
  }
  // 设置接受消息钩子
  public setMessageHookFn(receiver:any) {
    this.messageHookFn = receiver
  }
  // 设置关闭钩子
  public setCloseHookFn(receiver:any) {
    this.closeHookFn = receiver
  }
  // 设置错误钩子
  public setErrorHookFn(receiver:any) {
    this.errorHookFn = receiver
  }
}

export default WsGenerator

