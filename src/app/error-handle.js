const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
	let status, message

	switch (error.message) {
		case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
			status = 400
			message = '用户名密码不能为空~'
			break;
		case errorTypes.USER_ALREADY_EXISTS:
			status = 409
			message = '用户名已经存在~'
			break;
		case errorTypes.USER_NOT_EXIST:
			status = 400
			message = '用户不存在~'
			break;
		case errorTypes.PASSWORD_IS_INCORRENT:
			status = 400
			message = '密码不正确~'
			break;
		case errorTypes.UNAUTHORIZATION:
			status = 401
			message = '无效的token~'
			break;
		default:
			status = 404
			message = 'NOT FOUND~';
	}

	ctx.status = status
	ctx.body = message
}

module.exports = errorHandler