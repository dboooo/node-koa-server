const path = require("path")

function resolve(dir){
    return path.join(__dirname,dir)
}

const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require("koa-static")

const errHandler = require('./errHandler')
const allRouter = require('../router/index')

const app = new Koa()

app.use(KoaBody({
    multipart:true,
    formidable:{
        uploadDir:resolve("../upload"),
        keepExtensions:true,
    },
}))
app.use(allRouter.routes()).use(allRouter.allowedMethods())
app.use(KoaStatic(resolve("../upload")))

// 错误处理
app.on('error',errHandler)

module.exports = app