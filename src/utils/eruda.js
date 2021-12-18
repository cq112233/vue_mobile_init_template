/**
@params 调试工具
*/
import eruda from 'eruda'

if (process.env.NODE_ENV !== 'production') eruda.init()
