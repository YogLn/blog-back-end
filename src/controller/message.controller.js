const service = require('../services/message.services')

class MessageController {
	async create(ctx, next) {
		const { id, name } = ctx.user
		const { content } = ctx.request.body
		const result = await service.create(id, name, content)
		ctx.body = result
	}

	async list(ctx, next) {
		const { offset, size } = ctx.query
		const result = await service.getMsgList(offset, size)
		ctx.body = result
	}	

	async update(ctx, next) {
		const { msgId } = ctx.params
		const { content } = ctx.request.body
		const result = await service.update(msgId, content)
		ctx.body = result
	}

	async remove(ctx, next) {
		const { msgId } = ctx.params
		const result = await service.remove(msgId)
		ctx.body = result
	}
}

module.exports = new MessageController()