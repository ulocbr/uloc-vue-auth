import Vue from 'vue'
import App from './Root.vue'

import {createRouter} from './router'

// this imports everything from Uloc
import Uloc, * as UlocAll from 'uloc-vue'
// import store from './store'
// import { menu } from './components/routes'
import {createIcons} from './icons'

import Plugin from 'src'
import JWTProvider from 'src-dir/providers/jwt'

Vue.use(Uloc, {
  components: UlocAll,
  directives: UlocAll,
  plugins: UlocAll,
  config: {}
})

const router = createRouter()

Vue.use(Plugin, {
  router: router,
  config: {
    loginUrl: '/login'
  }
})

let provider = new JWTProvider({
  urlApi: 'https://api.rogeriomenezes.com.br/api',
  urlAuth: '/auth'
})
Plugin.Provider.defineProvider(provider)
console.log(Plugin.firewall()) //
Plugin.firewall().enable()

console.log('Plugin: ', Plugin) //

createIcons()

// Vue.prototype.$uloc.menu.set(require('./menu.json'))

export function createApp () {
  const app = {
    router,
    // store,
    render: h => h(App)
  }

  return {
    app: new Vue(app),
    router
  }
}
