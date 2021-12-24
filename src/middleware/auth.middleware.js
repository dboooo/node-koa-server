const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const {TokenExpiredError, invalidToken,syntaxTokenError,hasNotAdminPermission} = require("../constant/err.type")

const auth = async (ctx,next)=>{
    const {authorization = ''} = ctx.request.header
    const token = authorization.replace('Bearer ','')
    
    // 校验token
    try {
        // user中包含了payload信息
        const user = jwt.verify(token,JWT_SECRET)
        ctx.state.user = user
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

const hadAdminPermission = async (ctx,next)=>{
    const {is_admin} = ctx.state.user

    if(!is_admin) {
        console.error('无权限',err);
        return ctx.app.emit('error',hasNotAdminPermission,ctx)
    }
}

module.exports = {
    auth,
    hadAdminPermission
}