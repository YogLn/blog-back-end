const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list, detail, update, remove } = require('../controller/music.controller')

const musicRouter = new Router({prefix: '/music'})

musicRouter.post('/', verifyAuth, create )
musicRouter.get('/', list)
musicRouter.get('/:musicId', detail)
musicRouter.patch('/:musicId', update)
musicRouter.delete('/:musicId', remove)

module.exports = musicRouter