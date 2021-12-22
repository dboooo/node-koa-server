const Router = require('koa-router')
const {register,login} = require('../controller/user.controller')
const {userValuedator,verifyUser,cryptPassword,verifyLogin} = require('../middleware/user.middleware')
const router = new Router({prefix:'/users'})

// 注册
router.post('/register',userValuedator,verifyUser,cryptPassword,register)
// 登录
router.post('/login',userValuedator,verifyLogin,login)
// 修改密码接口
router.patch('/',(ctx,next)=>{
    ctx.body = 'change ok'
})

module.exports = router