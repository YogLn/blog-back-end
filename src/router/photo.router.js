const Router = require('koa-router')

const photoRouter = new Router({prefix: '/photo'})

const { verifyAuth } = require('../middleware/auth.middleware')
const { create, remove, list, update } = require('../controller/photo.controller')

photoRouter.post('/', verifyAuth, create)
photoRouter.patch('/:photoId', verifyAuth, update)
photoRouter.get('/', list)
photoRouter.delete('/:photoId', remove)

module.exports = photoRouter