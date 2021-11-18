const fs = require('fs');

const service = require('../services/user.services')
const fileService = require('../services/file.services')

class UserController {
	async create(ctx, next) {
		const user = ctx.request.body
		const result = await service.create(user)
		ctx.body = result
	}

	async avatarInfo(ctx, next) {
		const { userId } = ctx.params
		const avatarInfo = await fileService.getAvatarByUserId(userId)

		// 提供图像信息
		ctx.response.set('content-type', avatarInfo.mimetype)
		ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`)
	}
}

module.exports = new UserController()