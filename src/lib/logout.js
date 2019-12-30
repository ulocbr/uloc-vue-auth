import Plugin from '../globals.js'
import DefaultConfig from '../config'

export function createLogout (config = {}) {
  return {
    name: 'logout',
    path: config.logoutUrl || DefaultConfig.logoutUrl,
    beforeEnter (to, from, next) {
      Plugin.logout(() => {
        next(config.loginUrl || DefaultConfig.loginUrl)
      })
    }
  }
}
