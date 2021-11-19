const Router = require('koa-router')
const userRouter = new Router({prefix: '/users'})

const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const { create, avatarInfo, list, remove } = require('../controller/user.controller')

userRouter.post('/', verifyUser, handlePassword, create)
userRouter.get('/:userId/avatar', avatarInfo);
userRouter.get('/', list)
userRouter.delete('/:userId', remove)

module.exports = userRouter