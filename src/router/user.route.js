const Router = require('koa-router')
const {register,login} = require('../controller/user.controller')
const {userValuedator,verifyUser} = require('../middleware/user.middleware')
const router = new Router({prefix:'/users'})

// 注册
router.post('/register',userValuedator,verifyUser,register)
// 登录

module.exports = router