const Koa = require('koa')
const useRoutes = require('../router')
const bodyParser = require('koa-bodyparser')

const errorHandler = require('./error-handle');

const app = new Koa()
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

app.useRoutes = useRoutes
app.use(bodyParser())
app.useRoutes()

app.on('error', errorHandler)
module.exports = app