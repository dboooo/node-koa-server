const {getUserInfo} = require('../service/user.service')

const userValuedator = async (ctx,next)=>{
    const {user_name,password} = ctx.request.body
     // 合法性
     if(!user_name || !password) {
        console.error('用户名or密码为空',ctx.request.body);
        ctx.status = 400
        ctx.app.emit('erroor',{},ctx)
        return
    }
    await next()
}

const verifyUser = async (ctx,next) =>{
    const {user_name} = ctx.request.body
    // 合理性
    if(!getUserInfo({user_name})) {
        console.log('已经存在了')
        ctx.status = 409
        ctx.body = {
           code:'10002',
           message:'user has exits',
           result:''
        }
        return 
   }
   await next()
}

module.exports = {
    userValuedator,
    verifyUser
}