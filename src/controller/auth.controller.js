const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const { getUserByName } = require('../services/user.services')

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    const res = await getUserByName(name)
    const {avatar_url: avatarUrl} = res[0]
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = { id, name, token, avatarUrl }
  }

  async success(ctx, next) {
    ctx.body = '授权成功~'
  }
}

module.exports = new AuthController()
