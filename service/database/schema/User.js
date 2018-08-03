const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建用户Schema
const userSchema = new Schema({
	UserId:ObjectId,
	UserName:{unique:true,type:String},
	password:String,
	creatAt:{type:Date,default:Date.now()},
	lastLoginAt:{type:Date,default:Date.now()}
},{
	collection:'user'
})

userSchema.methods = {
    //密码比对的方法
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

//发布模型
mongoose.model('User',userSchema)