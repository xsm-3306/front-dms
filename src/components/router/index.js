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




export default router