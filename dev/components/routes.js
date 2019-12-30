import Main from './Main.vue'

const routes = []

export const menu = []

/* function loadComponent (path, meta, file, filePath) {
  return {
    path,
    meta,
    component: () => import(`./${filePath}/${file}`)
  }
} */

const componentsMain = {
  path: '/',
  component: Main,
  children: [
    {
      path: '/page1',
      component: () => import('./Page1'),
      meta: {
        title: 'Page 1 - Need Auth'
      }
    },
    {
      path: '/page2',
      component: () => import('./Page2'),
      meta: {
        title: 'Page 2 - Need Auth'
      }
    }
  ]
}

routes.push(componentsMain)

export default routes
