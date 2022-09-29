<template>
    当前用户:{{user}}
    
    <el-input
    v-model="sqltext"
    :rows="8"
    type="textarea"
    placeholder="Please input SQL"
  />
  <el-button type="success" @click="execsql">确认</el-button>
</template>

<script setup>
import router from '../router';
import { ref } from 'vue';
import {usePost} from '../../js/useaxios.js'

    const user=router.currentRoute.value.params.username
    
    const sqltext=ref("")

    function execsql(){
        let data={
            sql:sqltext.value,
            username:'xiaoshimin',
            dbname:'dms',
            dbnum:'db0'
        }
        let api='http://127.0.0.1:8081/api/sqlhandler'
        let headers={
            'Content-Type': 'multipart/form-data',
        }

        usePost(api,headers,data)
        .then(res=>{
            console.log(res.data.data,res.data.msg)
        })
        .catch(err=>{
            console.log(err)
        })

    }

</script>