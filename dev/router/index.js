import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {createLogin, createLogout, AuthThemeColor} from 'src'

routes.push(createLogin({
  loginUrl: '/login',
  loginComponent: AuthThemeColor
}))
routes.push(createLogout())

routes.push({path: '/*', component: () => import('../components/Error404.vue')})

Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    // mode: 'history',
    routes
  })
}
