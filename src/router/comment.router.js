const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')

const { create, reply, remove, list } = require('../controller/comment.controller')

const commentRouter = new Router({prefix: '/comment'})
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)

commentRouter.delete('/:commentId', verifyAuth, remove)
commentRouter.get('/', list)

module.exports = commentRouter