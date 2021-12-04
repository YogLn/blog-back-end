const Router = require('koa-router')

const articleRouter = new Router({ prefix: '/article' })

const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
  updateLabels,
  getListWithInfo
} = require('../controller/article.controller')

articleRouter.post('/', verifyAuth, create)
articleRouter.get('/', list)
articleRouter.get('/:articleId', detail)
articleRouter.patch('/:articleId', verifyAuth, update)
articleRouter.delete('/:articleId', verifyAuth, remove)

// 给动态添加标签
articleRouter.post(
  '/:articleId/label',
  verifyAuth,
  verifyLabelExists,
  addLabels
)
// 修改文章标签
articleRouter.patch(
  '/:articleId/label',
  verifyAuth,
  verifyLabelExists,
  updateLabels
)
// 模糊查询
articleRouter.post('/search', getListWithInfo)
module.exports = articleRouter
