const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../services/user.services')
const md5Password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
	// 1.获取用户名密码
	const { name, password } = ctx.request.body
	
	// 2.判断用户名和密码是否为空
	if(!name || !password) {
		const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
		return ctx.app.emit('error', error, ctx)
	}

	// 3.判断用户是否存在
	const result = await userService.getUserByName(name)
	const user = result[0]
	if(!user) {
		const error = new Error(errorTypes.USER_NOT_EXIST)
		return ctx.app.emit('error', error, ctx)
	}

	// 4.判断密码是否正确
	if(md5Password(password) !== user.password) {
		const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
		return ctx.app.emit('error', error, ctx)
	}
	ctx.user = user
	await next()
}

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (err) {
		console.log(err)
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
	verifyLogin,
	verifyAuth
}