const path = require('path')

const Multer = require('koa-multer')
const Jimp = require('jimp')

const avatarUpload = Multer({
	dest: './uploads/avatar'
})
const avatarHandler = avatarUpload.single('avatar')
module.exports = {
	avatarHandler
}