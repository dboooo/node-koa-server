const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const {TokenExpiredError, invalidToken,syntaxTokenError} = require("../constant/err.type")

const auth = async (ctx,next)=>{
    const {authorization} = ctx.request.header
    console.log(ctx.request.header);
    const token = authorization.replace('Bearer ','')
    
    // 校验token
    try {
        // user中包含了payload信息
        const user = jwt.verify(token,JWT_SECRET)
        ctx.status.user = user
        console.log(user);
    } catch(err) {
        console.log(err.name);
        switch(err.name) {
            case 'TokenExpiredError':
                console.error('token过期',err);
                return ctx.app.emit('error',TokenExpiredError,ctx)
            case "JsonWebTokenError":
                console.error("无效的token",err)
                return ctx.app.emit('error',invalidToken,ctx)
            case "SyntaxError":
                console.error("token有问题哦!",err);
                return ctx.app.emit('error',syntaxTokenError,ctx)
        }
    }
    await next()
}

module.exports = {
    auth
}