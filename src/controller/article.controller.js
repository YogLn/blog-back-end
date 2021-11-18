const service = require('../services/article.services')

class ArticleController {
  async create(ctx, next) {
    const { title, titleImg, description, content } = ctx.request.body
    const result = await service.create(title, titleImg, description, content)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await service.getArticleList(offset, size)
    ctx.body = result
  }

  async detail(ctx, next) {
    const { articleId } = ctx.params
    const result = await service.getArticleDetailsById(articleId)
    ctx.body = result
  }

  async update(ctx, next) {
    const { articleId } = ctx.params
    const { content } = ctx.request.body
    const result = await service.update(articleId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { articleId } = ctx.params
    const result = await service.remove(articleId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { articleId } = ctx.params

    for (const label of labels) {
      // 判断标签是否已经和动态有关系
      const isExist = await service.hasLabel(articleId, label.id);
      if(!isExist) {
        await service.addLabel(articleId, label.id)
      }
    }
    ctx.body = '添加标签成功~'
  }
}

module.exports = new ArticleController()
