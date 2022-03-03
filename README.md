
# 企业微信预研总结
### 本次预研的目标是了解企业微信的总体概况，清楚怎样创建一个自建应用，熟悉自建应用创建的流程以及自建应用开发的一般流程。 具体构建一个自建应用的demo，并对自建应用的创建、授权、开发、发布做一些探索。掌握自建应用html5模式下的，获取组织架构信息，获取成员详情，登录授权，jssdk 客户端api应用在技术上进行预研。
## 1.构建自建应用
  登录企业微信平台在应用管理模块下 应用-》自建栏目下 点击创建应用，填入应用的名称与简介。
## 2.自建应用基础配置
   ### 点击构建的自建应用可以在配置页面设置自建应用相关配置
### A.配置可见范围： 应用仅对可见范围内的成员可见
### B.配置功能：功能模块中可以配置应用的展示模式  以及应用的菜单定义，及收发消息的功能等等。本次预研选择在自定义菜单中添加h5网页为菜单的方式配置展示内容
### C.配置开发者接口：配置授权以及jssdk可信域名
  自建应用中如果使用了网页授权登录、以及jssdk的api则需要配置可信域名。
可信域名配置需要对域名所有权进行验证，即要保证企业微信主体与可信域名的归属是一致的。可作为应用OAuth2.0网页授权功能的回调域名配置要对应页面的访问地址可以精确到端口。
### 3.开发阶段准备
  ### 配置host： 
     因预研过程中需要使用网页授权登录 跟jssdk的技术 所以h5页面的访问需要构造成可信域名的形式。因此可以使用例如switchHosts等软件配置本地host 将可信域名映射到本地服务中。
  开启服务代理：
     Jssdk的部分api不可以在pc端企业微信中验证，所以需要使用移动端进行验证。
具体实现方式如下
     Pc端使用抓包工具（比如charles） 开启代理模式，手机端保持网络与pc端网络一致并开启网络代理，设置抓包工具对应的代理配置页面。然后手机端访问自建应用就会代理到pc本地。
## 4.搭建前后端
   后台构建
   后端使用node.js进行构建代码可以从企业微信的工具资源之中找到，本次使用的是https://github.com/WecomTeam/CodeSameples(企业微信开发者中心 Api 代码示例)  可以用来验证企业微信的人员组织详情、消息发送、access_token生成、临时文件上传等等共功能，另有一些其他的示例包括授权登录等等。
前台构建
  前端使用vue-cli脚手架构建项目，采用但应用模式。主要验证模块是  获取企业微信基础信息、验证jssdk，企业微信网页登录等等。



# qywx-test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
