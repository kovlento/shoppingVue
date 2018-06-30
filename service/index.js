//引入connect
const {connect} = require('./database/init.js')

const Koa = require('koa');
const app = new Koa();

app.use(async(ctx)=>{
	ctx.body = 'hello world';
});

app.listen(3000,()=>{
	console.log('[server] starting at port 3000')
})

//立即执行函数
(async () =>{
    await connect()
})()