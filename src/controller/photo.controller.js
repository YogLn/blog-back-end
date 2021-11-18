const service = require('../services/photo.services')
class PhotoController {
	async create(ctx, next) {
		const { imgUrl, desc } = ctx.request.body
		const result = await service.create( imgUrl, desc)
		ctx.body = result
	}

	async list(ctx, next) {
		const { offset, size } = ctx.query
		const result = await service.list(offset, size)
		ctx.body = result
	}

	async remove(ctx, next) {
		const { photoId } = ctx.params
		const result = await service.deletePhotoById(photoId)
		ctx.body = result
	}
}

module.exports = new PhotoController()