const Router = require('koa-router')
const archiveRouter = new Router({prefix: '/archive'})

const { create, list, update, remove } = require('../controller/archive.controller')

archiveRouter.post('/', create) 
archiveRouter.get('/', list)
archiveRouter.patch('/:archiveId', update)
archiveRouter.delete('/:archiveId', remove)

module.exports = archiveRouter