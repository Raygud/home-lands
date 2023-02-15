import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faCamera, faChevronLeft, faGear, faLocationDot, faMagnifyingGlass, faRightFromBracket, faRulerCombined, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

library.add(faChevronLeft, faFacebookSquare, faTwitterSquare, faUser, faGear, faRightFromBracket, faMagnifyingGlass, faCamera, faRulerCombined, faLocationDot, faHeart)


createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
