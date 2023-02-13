import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartShopping, faGear, faRightFromBracket, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faRightToBracket, faRightFromBracket, faUser, faGear, faCartShopping)


createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
