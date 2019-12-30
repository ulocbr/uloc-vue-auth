import install, { Plugin } from './install'
import { version } from '../package.json'
import _firewall from './lib/firewall'
import { createLogin } from './lib/login'
import { createLogout } from './lib/logout'
import { Provider } from './lib/provider'

export * from './components'
export * from './providers'
// export * from './directives'
// export * from './plugins'
// export * from './globals'
// export * from './utils'

const firewall = () => _firewall.instance
export default {
  version,
  install,
  firewall,
  Plugin,
  createLogin,
  createLogout,
  Provider
}
