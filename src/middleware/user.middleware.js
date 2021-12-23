const bcrypt = require('bcryptjs')
const {getUserInfo} = require('../service/user.service')
const {
    userFormateError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword
} = require('../constant/err.type');

const userValuedator = async (ctx,next)=>{
    const {user_name,password} = ctx.request.body
     // 合法性
     if(!user_name || !password) {
        console.error('用户名or密码为空',ctx.request.body);
        ctx.app.emit('error',userFormateError,ctx)
        return
    }
    await next()
}

const verifyUser = async (ctx,next) =>{
    const {user_name} = ctx.request.body
    try {
        const res = await getUserInfo({user_name})
        if(res) {
            console.error('用户已经存在',{user_name})
            ctx.app.emit('error',userAlreadyExited,ctx)
            return
        }
    }catch(err) {
        ctx.app.emit('error',userRegisterError,ctx)
        console.log(err);
        return
    }
    await next()
}

const cryptPassword = async (ctx,next) =>{
    const {password} = ctx.request.body

    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(Object.toString(password),salt)

        ctx.request.body.password = hash
    } catch(err) {
        console.log(err);
    }
    await next()
}

const verifyLogin = async (ctx,next)=>{
    // 判断用户是否存在
    const {user_name,password} = ctx.request.body
    try {
        const res = await getUserInfo({user_name})
        if(!res) {
            console.error('用户不存在')
            ctx.app.emit('error',userDoesNotExist,ctx)
            return
        }
        // 判断密码
        if(!bcrypt.compareSync(Object.toString(password),res.password)){
            ctx.app.emit('error',invalidPassword,ctx)
            return
        }
    } catch(err) {
        console.error('用户登陆失败',err);
        ctx.app.emit('error',userLoginError,ctx)
        return
    }
    await next()
}

module.exports = {
    userValuedator,
    verifyUser,
    cryptPassword,
    verifyLogin
}