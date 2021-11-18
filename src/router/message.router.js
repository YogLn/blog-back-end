const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list, update, remove } = require('../controller/message.controller')

const messageRouter = new Router({prefix: '/message'})

messageRouter.post('/', verifyAuth, create )
messageRouter.get('/', list)
messageRouter.patch('/:msgId', update)
messageRouter.delete('/:msgId', remove)

module.exports = messageRouter