<script setup>
import { ref } from 'vue';
import router from '../router';
import { usePost } from '../../js/useaxios';
import { ElMessage, ElMessageBox } from 'element-plus';
    const loginInfo=ref({
        username:'',
        password:'',
    })
   
    const loginForm=ref(null)
    const checked=ref(true)
    const rules={
        username:[
            {required:true,message:'用户名不能为空',trigger:'blur'}
        ],
        password:[
            {required:true,message:'密码不能为空',trigger:'blur'}
        ]
    }
    function login(){
        let data=loginInfo.value
        let api='http://192.168.37.149:8081/api/user/login'
        let headers={
            'Content-Type': 'multipart/form-data',
        }
        loginForm.value.validate(valid=>{
            if(valid){
                usePost(api,headers,data)
                .then(
                    res=>{
                        if(res.data.code===200){
                           // ElMessage.success('登陆成功')
                            localStorage.setItem('token',res.data.data.token)
                            localStorage.setItem('username',loginInfo.value.username)
                            let url='/user/'+loginInfo.value.username
                            router.push(url)
                            
                        }else{
                            ElMessage.warning(res.data.data.err)
                        }
                    }
                )
                .catch(err=>{
                    console.log(err)
                    ElMessage.error('登录失败')
                })
            }else{
                console.log(valid)
                return false
            }
        })
    }
    
</script>

<template>

    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <img src='src/assets/database.png' class="logo">
                <div class="name">
                <div class="title">Min-Dms</div>
                <div class="tips">Vue3.0+Element-Plus</div>
                </div>
            </div>
        <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-position="top" label-width:10px class="login-form">
            <el-form-item label="账号" prop="username">
                <el-input v-model="loginInfo.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginInfo.password"  show-password></el-input>
            </el-form-item>
            <el-form-item class="login-button">
                <el-checkbox v-model="checked" @change="!checked">记住我</el-checkbox>
                <el-button style="width:100%" type="primary" @click="login()">立即登录</el-button>
            </el-form-item>
        </el-form>

    </div>
    </div>
</template>

<style scoped>
    .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    margin-top: 75px;
    /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
  }
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
  .login-button{
    width: 100%;
    margin: 0 auto;
    margin-top: 15px;
  }

</style>