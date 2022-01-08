const service = require('../services/music.services')

class MusicController {
  async create(ctx, next) {
    const { name, artist, url, cover, lrc, theme } = ctx.request.body
    const result = await service.create(name, artist, url, cover, lrc, theme)
    ctx.body = result
  }

  async list(ctx, next) {
    const result = await service.list()
    ctx.body = result
  }
  async detail(ctx, next) {
    const { musicId } = ctx.params
    const result = await service.detail(musicId)
    ctx.body = result
  }

  async update(ctx, next) {
    const { musicId } = ctx.params
    const { name, artist, url, cover, lrc, theme } = ctx.request.body
    const result = await service.update(
      musicId,
      name,
      artist,
      url,
      cover,
      lrc,
      theme
    )
    ctx.body = result
  }

  async remove(ctx, next) {
    const { musicId } = ctx.params
    const result = await service.remove(musicId)
    ctx.body = result
  }
}

module.exports = new MusicController()
