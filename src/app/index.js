const Koa = require('koa')
const koaBody = require('koa-body')
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


app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}))

app.useRoutes = useRoutes
app.use(bodyParser())
app.useRoutes()

app.on('error', errorHandler)
module.exports = app