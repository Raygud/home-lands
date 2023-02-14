import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faGear, faMagnifyingGlass, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

library.add(faChevronLeft, faFacebookSquare, faTwitterSquare, faUser, faGear, faRightFromBracket, faMagnifyingGlass)


createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
