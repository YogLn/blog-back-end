const Koa = require('koa')
const useRoutes = require('../router')
const bodyParser = require('koa-bodyparser')

const errorHandler = require('./error-handle');

const app = new Koa()

app.useRoutes = useRoutes
app.use(bodyParser())
app.useRoutes()

app.on('error', errorHandler)
module.exports = app