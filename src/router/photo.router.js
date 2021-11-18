const Router = require('koa-router')

const photoRouter = new Router({prefix: '/photo'})

const { verifyAuth } = require('../middleware/auth.middleware')
const { create, remove, list } = require('../controller/photo.controller')

photoRouter.post('/', verifyAuth, create)
photoRouter.get('/', list)
photoRouter.delete('/:photoId', verifyAuth, remove)

module.exports = photoRouter