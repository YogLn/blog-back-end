const fileService  = require('../services/file.services')
const userService  = require('../services/user.services')
const { APP_HOST, APP_PORT } = require('../app/config');

class FileController {
	async saveAvatarInfo(ctx,next) {
		// 1. 获取图像信息
		const { filename, mimetype, size } = ctx.req.file
		const { id } = ctx.user

		// 2. 将图像保存到数据库中
		fileService.createAvatar(filename, mimetype, size, id)

		// 3.将图像地址保存到user中
		const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
		await userService.updateAvatarUrlById(avatarUrl, id)
		
		ctx.body = '上传头像成功~'
	}
}

module.exports = new FileController()