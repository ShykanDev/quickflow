import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/index.css'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, IoAddOutline, MdRemoveOutlined,MdAddcircleRound  } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, IoAddOutline, MdRemoveOutlined,MdAddcircleRound );


const app = createApp(App)
app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
