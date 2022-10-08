<template>
    
    <p>当前用户:{{user}}</p>

    <el-tree :props="props" :load="loadNode"   lazy show-checkbox />

    <p>
        <li v-for="dbnum in dbNumList.list">{{dbnum}}</li>
    </p>
    
    
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
import { onBeforeMount, reactive, ref, toRefs } from 'vue';
import {usePost} from '../../js/useaxios.js'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { treeEmits } from 'element-plus/es/components/tree-v2/src/virtual-tree';

    const user=router.currentRoute.value.params.username
    
    const sqltext=ref("")
    const dbNumList=reactive({
        list: [] as any[]  //类型断言
    })

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
    //挂载之前获取可用实例列表
    onBeforeMount(()=>{
        let data={
            username:'admin',
        }
        let api='http://127.0.0.1:8081/api/getdbinstancelist'
        let headers={
            'Content-Type': 'multipart/form-data',
        }
        
        usePost(api,headers,data)
        .then(res=>{
            console.log(res.data.data.dbNumList)
            res.data.data.dbNumList.forEach(element => dbNumList.list.push(element));
        })
        .catch(err=>{
            console.log(err)
        })

        return {dbNumList}
    })
    

    interface Tree {
    name: string
    leaf?: boolean
  }
  
  const props = {
    label: 'name',
    children: 'zones',
    isLeaf: 'leaf',
  }
  
  const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
    if (node.level === 0) {
        
        let showList=reactive({
        list: [] as any[]  //类型断言
    })
        showList.list=dbNumList.list.map(item=>{
            item.leaf=false
            return item
        })

      return resolve(showList.list)
    }
    if (node.level > 1) return resolve([])
    
    setTimeout(() => {
      const data: Tree[] = [
        {
          name: 'dms',
          leaf: true,
        },
        {
          name: 'zone',
          leaf: true,
        },
      ]
      
  
      resolve(data)
    }, 500)
  }

</script>