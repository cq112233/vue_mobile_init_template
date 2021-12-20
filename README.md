## h5-app 基本使用说明

### [预览示例](http://121.196.173.85)

#### 先执行
```
cnpm i 
```
#### 启动开发服务
```
npm run serve 
```
#### 打包测试环境
```
npm run build:test 
```
#### 打包生产环境
```
npm run build:prod 
```
#### 查看分析生产环境打包各依赖包文件大小
```
npm run analyz 
```
#### 开启dll 加快开发服打包速度 (app.config.js 配置)
```
npm run dll 
```

### 动态路由 尽量不要用name跳转 生产环境有问题

### 查看webpack配置
```
开发环境：npx vue-cli-service inspect --mode development >> webpack.config.development.js
生产环境：npx vue-cli-service inspect --mode production >> webpack.config.production.js
```

### plop使用

-  一键生成 页面，组件,再也不用 复制粘贴了
- [了解plop微型自动化构建的脚手架工具github官网地址](https://github.com/plopjs/plop)
- [辅助了解plop](https://blog.csdn.net/hjb2722404/article/details/110957386)
- [了解handlebars模版语法地址](https://handlebarsjs.com/zh/guide/)

### 创建page(通过plop 会自动生成路由)
```
plop page
```

### 创建组件 (通过plop创建的组件,在页面中可以直接通过 import 'Test' from 'Test' 直接导入组件 )

```
plop component
```

### 创建layout

```
plop layout
```


### 命名规范

```
类,枚举: XxxYyy
常量: XXX_YYY
组件,page,layout,方法,变量: xxxYyy
css样式: xxx-yyy
```

### ==必看== src下的mixin文件(可以使用onShow onHide onLoad onUnload 生命周期钩子)  

```

通过plop 自动化工具创建页面都会混入 这里代理了一些方法，减少不必要的代码量
```

### ==必看== app.config.js


### 项目src开发目录

| src文件目录|文件说明|
|-|-|
| apis          | ajax请求目录                                         | 
| assets        | 初始化样式及全局样式  图片 字体 字体图标库  国际化语言包  主题颜色 | 
| components    | 通用组件 项目组件                                      | 
| directives    | 自定义指令集                                           |
| echarts       | echarts                                           |
| enums         | 枚举                                                 |
| env           | 生产环境不用nginx 做反向代理 后端解决同源政策问题       | 
| filters       | 自定义过滤器                                          | 
| i18n          | 国际化                                              | 
| layout        | tabbar布局页                                           |
| learn         | 学习demo                                         |
| mock          | mock数据                                             |
| page          | navbar布局页                                        |
| plugins       | 全局插件 如:axios 做一层如接口的代理方法 防止axios停止维护导致修改全部项目文件 ,实现插件与项目的解耦| 
| router        | 路由文件                                              | 
| store         | vuex 状态管理                                           | 
| theme         | css主题文件                                              | 
| utils         | 工具类 dom lodash moment regexp localStore等      | 
| vant          | vant 按需加载                                      | 
| views         | 业务页面                                              | 
| webSocket     | ws连接器                                          | 


### 项目根目录
| 根目录 |文件说明|
|-|-|
| .github     | ci/cd 集成式持续自动化部署脚本                                         | 
| plop-templates     | plop模版                                         | 
| public             | 静态资源                                         | 
| app.config.js      | app基本配置                                         | 
| plopfile.js        | plop命令入口 | 
| pm2.config.json    | nodeJS 启动 |
| tsconfig.json      | ts配置      |

### 打标签 tag 项目重要节点


```
git tag v0.0.1
git push origin v0.0.1
git tag -d v0.0.1
```




