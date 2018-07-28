const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

//引入我们的user.js模块
let user = require('./appApi/user.js')

//装载所有子路由
let router = new Router();
router.use('/user',user.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())
app.use(cors())
 
;(async ()=>{
    await connect()
    initSchemas()
})()


app.use(async(ctx)=>{
    ctx.body='<h1>Hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})