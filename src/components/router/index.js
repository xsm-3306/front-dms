import {createRouter,createWebHashHistory} from 'vue-router'
import { usePost } from '../../js/useaxios';

const routes=[
    {path:"/:catchAll(.*)",name:'notfound',component:()=>import('../user/notfound.vue')},
    {path:'/user/:username',name:'user',component:()=>import('../user/user.vue')},
    {path:'/login',name:'login',component:()=>import('../user/login.vue')}
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})


router.beforeEach(async(to,from)=>{
    let data={
    }
    let api='http://192.168.37.149:8081/api/getdbinstancelist'
    let headers={
        'Content-Type': 'multipart/form-data',
        'Authorization':'Bearer '+localStorage.getItem('token')
    } 
    if(from!=='login'){
        usePost(api,headers,data)
        .then(res=>{
            if (res.data.data.code!==200){
                return{name:'login'}
            }
        })
    }


})


export default router