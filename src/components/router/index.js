import {createRouter,createWebHashHistory} from 'vue-router'
import { usePost } from '../../js/useaxios';

const routes=[
    //{path:"/:catchAll(.*)",name:'notfound',component:()=>import('../user/notfound.vue')},
    {path:"/:catchAll(.*)",name:'notfound',redirect:'/login'},
    {path:'/user/:username',name:'user',component:()=>import('../user/user.vue')},
    {path:'/login',name:'login',component:()=>import('../user/login.vue')}
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})


router.beforeEach(async(to,from,next)=>{
    console.log(to,from)
    
    next()
})


export default router