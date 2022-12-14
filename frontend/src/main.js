import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Axios from 'axios'
import App from './App.vue'
import router from './router'
const axioInstance = Axios.create({
    baseURL: 'http://localhost:3000'
})

const app = createApp(App)

app.config.globalProperties.$axios = axioInstance

app.use(ElementPlus).use(router).mount('#app')
