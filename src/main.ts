import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/index.css'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, IoAddOutline, MdRemoveOutlined,MdAddcircleRound,BiArrowRightCircle,FaArrowLeft,RiCloseCircleLine,MdMenuRound,HiSolidHome,MdSettingsapplicationsSharp,FaHistory, FaCashRegister, IoEyeOffSharp, IoEyeSharp, MdPointofsale,BiImageFill         } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, IoAddOutline, MdRemoveOutlined,MdAddcircleRound,BiArrowRightCircle,FaArrowLeft,RiCloseCircleLine,MdMenuRound,HiSolidHome,MdSettingsapplicationsSharp,FaHistory, FaCashRegister, IoEyeOffSharp, IoEyeSharp, MdPointofsale,BiImageFill        );


const app = createApp(App)
app.use(pinia)
app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
