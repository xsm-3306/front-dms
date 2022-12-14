import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './components/router'

const app=createApp(App)
app.use(ElementPlus).use(router)
app.mount('#app')
