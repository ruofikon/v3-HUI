import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import HUI from './libs/HUI'
createApp(App)
  .use(router)
  .use(HUI)
  .mount('#app')
