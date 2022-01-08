const service = require('../services/photo.services')
class PhotoController {
	async create(ctx, next) {
		// let file = ctx.request.files.image // file就是前端传过来的文件名称
		// console.log(file);
    // let uppath = file.path // 上传服务器的缓存路径
    // // 创建可读流
    // let reader = fs.createReadStream(uppath)
    // //创建文件名
    // let newFilename = new Date().getTime() + '.' + file.name.split('.')[1]
    // // 文件保存路径
    // let filePath = path.join(__dirname, 'public/upload/') + `${newFilename}`
    // // 创建可写流
    // let upStream = fs.createWriteStream(filePath)
    // // 可读流通过管道写入可写流
    // reader.pipe(upStream)
    // ctx.body = {
    //   error: 0,
    //   url: `/upload/${file.name}`
    // }
		const { imgUrl, desc } = ctx.request.body
		const result = await service.create( imgUrl, desc)
		ctx.body = result
	}

	async list(ctx, next) {
		const { offset, size } = ctx.query
		const result = await service.list(offset, size)
		ctx.body = result
	}
	async update(ctx, next) {
		const { photoId } = ctx.params
		const { imgUrl, desc } = ctx.request.body
		const result = await service.update(imgUrl, desc,photoId)
		ctx.body = result
	}

	async remove(ctx, next) {
		const { photoId } = ctx.params
		const result = await service.deletePhotoById(photoId)
		ctx.body = result
	}
}

module.exports = new PhotoController()