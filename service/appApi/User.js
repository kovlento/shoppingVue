const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/',async(ctx)=>{
	ctx.body='这是用户操作首页'
})
router.post('/register',async(ctx)=>{
	const User = mongoose.model('User')  //获取model
	let newUser = new User(ctx.request.body)//把从前端接收的POST数据封装成一个新的user对象
	//用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
	await newUser.save().then(()=>{
		//成功返回code=200，并返回成功信息
		ctx.body={
			code:200,
			message:'注册成功'
		}
	}).catch(error=>{
		//失败返回code=500，并返回错误信息
		ctx.body={
			code:500
			message:'注册失败，请联系管理员'
		}
	})

	console.log(ctx.request.body)
	ctx.body=ctx.request.body
})
module.exports = router;