const Router = require("koa-router")
const {upload} = require('../controller/goods.controller')
const {auth,hadAdminPermission} = require('../middleware/auth.middleware')

const router = new Router({prefix:'/goods'})

// 商品图片上传
router.post('/upload',auth,hadAdminPermission,upload)

module.exports = router

