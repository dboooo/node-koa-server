const Koa = require('koa')
const KoaBody = require('koa-body')

const errHandler = require('./errHandler')
const allRouter = require('../router/index')

const app = new Koa()

app.use(KoaBody())
app.use(allRouter.routes()).use(allRouter.allowedMethods())

// 错误处理
app.on('error',errHandler)

module.exports = app