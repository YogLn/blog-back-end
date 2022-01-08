const service = require('../services/archive.services')

class ArchiveController {
  async create(ctx, next) {
    const { title, image, content } = ctx.request.body
    const result = await service.create(title, image, content)
    ctx.body = result
  }

  async list(ctx, next) {
    const result = await service.getArchiveList()
    ctx.body = result
  }

  async update(ctx, next) {
    const { archiveId } = ctx.params
    const { title, image, content } = ctx.request.body
    const result = await service.update(title, image, content, archiveId)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { archiveId } = ctx.params
    const result = await service.remove(archiveId)
    ctx.body = result
  }
}

module.exports = new ArchiveController()
