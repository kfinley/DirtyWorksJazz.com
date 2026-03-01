import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { BootstrapCommand } from './commands/bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)

new BootstrapCommand().runAsync({});

app.mount('#app')
