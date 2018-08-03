<template>
    <div>
       <van-nav-bar
        title="用户登录"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
 
        <div class="register-panel">
        <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            :error-message="usernameErrorMsg"
            @click-icon="username = ''"
        />
 
        <van-field
            v-model="password"
            type="password"
            label="密码"
            :error-message="passwordErrorMsg"
            placeholder="请输入密码"
            required
        />
        <div class="register-button">
            <van-button type="primary" @click="loginAction" :loading="openLoading" size="large">登录</van-button>
        </div>
       </div>
 
    </div>
</template>
 
<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'

    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false,
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
            },
            axiosLoginUser(){
                axios({
                    url:url.login,
                    method:'post',
                    data:{
                        username:this.username,
                        password:this.password
                    }
                }).then(response =>{
                    console.log(response)
                    if(response.data.code==200){
                        Toast.success('登录成功')
                        this.$router.push('/')
                    }else{
                        console.log(response.data.message)
                        Toast.fail('登录失败')
                        this.openLoading=false
                    }
                }).catch(error =>{
                    Toast.fail('登录失败')
                    this.openLoading=false
                })
            },
            checkForm(){
                let isOk = true
                if(this.username.length<3){
                    this.usernameErrorMsg='用户名不能小于3位'
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg='密码不能小于6位'
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            },
            loginAction(){
                 this.checkForm() && this.axiosLoginUser()
            }
        },
    }
</script>
 
<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>