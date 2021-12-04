const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')

const {
  create,
  reply,
  remove,
  list,
  like,
  dislike
} = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)

commentRouter.delete('/:commentId', remove)
commentRouter.get('/:articleId', list)

// 点赞
commentRouter.post('/:commentId/like', like)
// 踩
commentRouter.post('/:commentId/dislike', dislike)
module.exports = commentRouter
