<template>
    
    <p>当前用户:{{user}}</p>

    <el-tree 
        :props="props" 
        :load="loadNode" 
        

        ref="treeRef"
        node-key="id"
        check-strictly:false
        @check-change="handleCheckChange"
        show-checkbox
        lazy
        check-on-click-node
        accordion
        
        highlight-current  

        />

        <div class="buttons">
    <el-button @click="getCheckedNodes">get by node</el-button>
    <el-button @click="getCheckedKeys">get by key</el-button>

  </div>
        

    <el-input
    v-model="sqltext"
    :rows="8"
    type="textarea"
    placeholder="此处输入 SQL"
  />
  <el-button type="success" @click="execsql">确认</el-button>

</template>

<script lang="ts" setup>
import router from '../router';
import {  ref } from 'vue';
import {usePost} from '../../js/useaxios.js'
import { ElTree } from 'element-plus'
import Node from 'element-plus/es/components/tree/src/model/node'


const user=router.currentRoute.value.params.username

const sqltext=ref("")

function execsql(){
        let data={
            sql:sqltext.value,
            username:'admin',
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
 
const props={
        label: 'name',
        children: "",
        isLeaf: 'leaf'
    }

function handleNodeClick(data){
        console.log("node",data)
    }

const loadNode=(node,resolve)=>{
      // console.log(node, resolve)
      // 一级节点处理。数据库实例列表
      if (node.level === 0) {
        getDbInstanceList(resolve)
      }
      // 二级节点处理。数据库列表
      if (node.level == 1) {
        // 注意！把resolve传到你自己的异步中去
        getDbList(resolve,node)
    }
      if(node.level>=2){
        //所有的权限只到库级别的粒度，表级别不展示
        return resolve([])
      }
}

//首次加载所有可用数据库实例，一级节点
 function getDbInstanceList(resolve){
        let data={
            username:user,
        }
        let api='http://127.0.0.1:8081/api/getdbinstancelist'
        let headers={
            'Content-Type': 'multipart/form-data',
        }

        usePost(api,headers,data)
        .then(res=>{
            console.log(res.data.data,res.data.msg)
            if(res.data.code===200){
               let dbInstanceList=res.data.data.dbNumList.map((item, index)=>{
                    return{
                        id: index,
                        name:item,
                        leaf:false
                    }
                })
                //let data=res.data.data.dbNumList
                resolve(dbInstanceList)
            }
        })
    }

//加载可用数据库列表，叶子节点
function getDbList(resolve,node){
    let dbNum=node.data.name
    let data={
            username:user,
            dbnum:dbNum
        }
        let api='http://127.0.0.1:8081/api/getdblist'
        let headers={
            'Content-Type': 'multipart/form-data',
        }

        usePost(api,headers,data)
        .then(res=>{
            console.log(res.data.data,res.data.msg)
            if(res.data.code===200){
               let dbList=res.data.data.dbList.map((item, index)=>{
                    return{
                        id: item+"-"+index,
                        name:item,
                        leaf:true
                    }
                })
                //let data=res.data.data.dbNumList
                resolve(dbList)
            }
        })
}

const treeRef = ref<InstanceType<typeof ElTree>>()
//check-change事件触发。实现复选框即数据库单选
function handleCheckChange(data,checked,indeterminate){
    if(checked){ 
        treeRef.value!.setCheckedKeys([data.id],true)
        console.log(data)
    }
    //console.log(data)
}

const getCheckedNodes = () => {
  console.log(treeRef.value!.getCheckedNodes(false, false))
}
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(true))
}

</script>