import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import Store from './store'
import { resourceApi, authorizeApi } from './axios'
import * as icons from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(Store)
app.config.globalProperties.$resourceApi = resourceApi
app.config.globalProperties.$authorizeApi = authorizeApi

// el-icon全局注册
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})

app.mount('#app')


