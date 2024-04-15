import './assets/main.css'
import './assets/frog.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import NTTooltip from 'vue-nt-tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(NTTooltip)

app.mount('#app')
