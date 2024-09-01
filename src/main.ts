import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/assets/index.css'
import { createPinia } from 'pinia'
import Chart from 'primevue/chart'; // Importa el componente de gráficos

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, IoAddOutline, MdRemoveOutlined,MdAddcircleRound,BiArrowRightCircle,HiColorSwatch,FaArrowLeft,RiCloseCircleLine,MdMenuRound,HiSolidHome,MdSettingsapplicationsSharp,FaHistory, FaCashRegister, IoEyeOffSharp, IoEyeSharp, MdPointofsale,BiImageFill, GiPig,MdNoteadd,MdAddbox,RiCheckboxIndeterminateFill,GiReceiveMoney, GiPayMoney,GiMoneyStack,MdExpandcircledownRound, BiDot     } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, IoAddOutline, MdRemoveOutlined,MdAddcircleRound,BiArrowRightCircle,HiColorSwatch,FaArrowLeft,RiCloseCircleLine,MdMenuRound,HiSolidHome,MdSettingsapplicationsSharp,FaHistory, FaCashRegister, IoEyeOffSharp, IoEyeSharp, MdPointofsale,BiImageFill, GiPig,MdNoteadd,MdAddbox,RiCheckboxIndeterminateFill,GiReceiveMoney, GiPayMoney,GiMoneyStack,MdExpandcircledownRound, BiDot    );


const app = createApp(App)

app.use(pinia)
app.use(router)
app.component("v-icon", OhVueIcon);
app.component('PrimeChart', Chart);
app.mount('#app')
