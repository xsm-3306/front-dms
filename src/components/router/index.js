import {createRouter,createWebHashHistory} from 'vue-router'

const routes=[
    {path:'/user/:username',name:'user',component:()=>import('../user/user.vue')}
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router