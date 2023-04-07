import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
