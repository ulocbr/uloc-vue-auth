import DefaultConfig from '../config'

export function createLogin (config = {}) {
  return {
    name: 'login',
    path: config.loginUrl || DefaultConfig.loginUrl,
    component: config.loginComponent || DefaultConfig.loginComponent
  }
}
