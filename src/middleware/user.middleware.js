const app = require('../app');
const errorTypes = require('../constants/error-types');
const service = require('../services/user.services')
const md5Password = require('../utils/password-handle');

const verifyUser = async (ctx, next) => {

	// 1.获取用户名和密码
	const { name, password } = ctx.request.body;

	// 2. 判断用户名密码不能为空
	if(!name || !password) {
		const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
		return ctx.app.emit('error', error, ctx)
	}

	// 3.判断用户是否注册过
	const result = await service.getUserByName(name)
	if(result.length) {
		return ctx.body = {
			status: 409,
			message: '用户名已经存在~'
		}
		// const error = new Error(errorTypes.USER_ALREADY_EXISTS)
		// return ctx.app.emit('error', error, ctx)
	}

	await next()
}

const handlePassword = async (ctx, next) => {
	const { password } = ctx.request.body
	ctx.request.body.password = md5Password(password)
	await next()
}

module.exports = {
	verifyUser,
	handlePassword
}