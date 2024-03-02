import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Showresult from './views/components/Showresult.vue'
import Popup from './views/components/Popup.vue'
import DB from './views/components/DB.vue'
import Vbackpopup from './views/components/Vbackpopup.vue'

const app = createApp(App)
app.use(router)
app.component('Showresult',Showresult)
app.component('Popup',Popup)
app.component('DB',DB)
app.component('Vbackpopup',Vbackpopup)

app.mount('#app')
