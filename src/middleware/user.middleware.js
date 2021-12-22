const {getUserInfo} = require('../service/user.service')
const {userFormateError,userAlreadyExited,userRegisterError} = require('../constant/err.type');

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
    // 合理性
//     if(await getUserInfo({user_name})) {
//         ctx.app.emit('error',userAlreadyExited,ctx)
//         return
//    }
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

module.exports = {
    userValuedator,
    verifyUser
}