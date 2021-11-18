const Router = require('koa-router')

const articleRouter = new Router({prefix: '/article'})

const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const { create, list, detail, update, remove, addLabels } = require('../controller/article.controller')

articleRouter.post('/', verifyAuth, create)
articleRouter.get('/', list)
articleRouter.get('/:articleId', detail)
articleRouter.patch('/:articleId', verifyAuth, update)
articleRouter.delete('/:articleId', verifyAuth, remove)

// 给动态添加标签
articleRouter.post('/:articleId/label', verifyAuth, verifyLabelExists, addLabels)
module.exports = articleRouter