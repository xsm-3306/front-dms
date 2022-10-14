
<template>
    <div class="common-layout">
      <el-container>
        <div class="head-show">
            <el-header>当前用户:{{user}}</el-header>
        </div>
        
        <el-container>
          <el-aside width="200px">
            <div class="dbtree">
                <el-tree 
                    :props="props" 
                    :load="loadNode" 
                    ref="treeRef"
                    node-key="id"
                    @node-expand="handleNodeExpand"
                    @check-change="handleCheckChange"
                    lazy
                    check-on-click-node	
                    accordion
                    highlight-current  
                    > </el-tree>
            </div>
          </el-aside>

          <el-main>
            <div class="sql-input">
                <el-input
                v-model="sqltext"
                :rows="8"
                type="textarea"
                 placeholder="此处输入 SQL"
            />
            </div>
            
            <div class="execsql-button">
                <el-button type="success" @click="execsql" height="500px">确认</el-button>
            </div>
            
          </el-main>

        </el-container>
      </el-container>
    </div>
</template>



<script lang="ts" setup>
import router from '../router';
import {  reactive, ref } from 'vue';
import {usePost} from '../../js/useaxios.js'
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import Node from 'element-plus/es/components/tree/src/model/node'


const user=router.currentRoute.value.params.username

const sqltext=ref("")

function execsql(){
        let data={
            sql:sqltext.value,
            username:user,
            dbname:localStorage.getItem("dbname"),
            dbnum:localStorage.getItem("dbnum")
        }
        let api='http://127.0.0.1:8081/api/sqlhandler'
        let headers={
            'Content-Type': 'multipart/form-data',
        }

        usePost(api,headers,data)
        .then(res=>{
            console.log(res.data.data,res.data.msg)
            response=res.data
        })
        .catch(err=>{
            console.log(err)
        })
        return response
    }
    let response=ref("")
 
const props={
        label: 'name',
        children: "",
        isLeaf: 'leaf'
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
        localStorage.setItem("dbname",data.name)
        console.log(data)
    }
    //console.log(data)
}

//每次点击展开获取dbnum
function handleNodeExpand(data,node){
    if(!data.leaf){
        localStorage.setItem("dbnum",data.name)
    }
    console.log(data)
}

</script>


<style lang="css" scoped>



</style>
