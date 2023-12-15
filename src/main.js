import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Showresult from './components/Showresult.vue'
import Popup from './components/Popup.vue'
import DB from './components/DB.vue'
import Vbackpopup from './components/Vbackpopup.vue'

const app = createApp(App)
app.use(router)
app.component('Showresult',Showresult)
app.component('Popup',Popup)
app.component('DB',DB)
app.component('Vbackpopup',Vbackpopup)
app.mount('#app')
