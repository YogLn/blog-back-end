const Router = require('koa-router')

const labelRouter = new Router({prefix: '/label'})

const {
  verifyAuth
} = require('../middleware/auth.middleware');

const {
  create,
  list,
  remove
} = require('../controller/label.controller')
 
labelRouter.post('/', verifyAuth, create)
labelRouter.get('/', list)
labelRouter.delete('/:labelId', remove)

module.exports = labelRouter