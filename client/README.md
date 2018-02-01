# client

> 客户端项目

***
## 生产环境部署问题

### 1. 跨域

> 1. 将所有 axios 的请求地址改为相对应的完整 url 。
> 2. 删掉 config/index.js 中的 dev 下的 proxyTable 内容。

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
