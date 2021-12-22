const Router = require('koa-router')
const {register,login} = require('../controller/user.controller')
const {userValuedator,verifyUser,cryptPassword,verifyLogin} = require('../middleware/user.middleware')
const router = new Router({prefix:'/users'})
const {auth} = require('../middleware/auth.middleware')

// 注册
router.post('/register',userValuedator,verifyUser,cryptPassword,register)
// 登录
router.post('/login',userValuedator,verifyLogin,login)
// 修改密码接口
router.patch('/',auth,(ctx,next)=>{
    ctx.body = '修改密码成功!'
})

module.exports = router