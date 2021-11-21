const service = require('../services/comment.services')
class CommentController {
	async create(ctx, next) {
		const { articleId, content } = ctx.request.body;
		const { id } = ctx.user;
		const result = await service.create(articleId, content, id) 
		ctx.body = result
	}

	async reply(ctx, next) {
		const { articleId, content } = ctx.request.body;
		const { commentId } = ctx.params
		const { id } = ctx.user;
		const result = await service.reply(articleId, content, commentId, id)
		ctx.body = result
	}

	async remove(ctx, next) {
		const { commentId } = ctx.params
		const result = await service.remove(commentId)
		ctx.body = result
	}
	async list(ctx, next) {
		const { articleId } = ctx.params
		const result = await service.getCommentListByArticleId(articleId)
		ctx.body = result
	}
}

module.exports = new CommentController()