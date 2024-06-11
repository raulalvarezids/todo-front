import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdDeleteforever } from "oh-vue-icons/icons";



import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
const app = createApp(App)

addIcons(MdDeleteforever);



pinia.use(piniaPluginPersistedstate)
app.component("v-icon",OhVueIcon)
app.use(pinia).use(router).mount('#app')
