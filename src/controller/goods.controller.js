class GoodsController {
    async upload(ctx,next) {
        ctx.body = 'ok'
    }
}

module.exports = new GoodsController()