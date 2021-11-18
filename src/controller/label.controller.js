const service = require('../services/label.services')

class LabelController {
	async create(ctx, next) {
		const { name } = ctx.request.body
		const result = await service.create(name);
		ctx.body = result
	}

	async list(ctx, next) {
		const result = await service.getLabelList()
		ctx.body = result
	}
	
	async remove(ctx, next) {
		const { labelId } = ctx.params
		const result = await service.deleteLabelById(labelId)
		ctx.body = result
	}
}

module.exports = new LabelController()