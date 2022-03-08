import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import router from './router'
const app = createApp(App)
app.use(ElementPlus as any)

app.use(router);

// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})
app.mount('#app')
