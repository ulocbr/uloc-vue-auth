import axios from 'axios'
import { throttleAdapterEnhancer } from 'axios-extensions'

export const http = (function (options) {
  return axios.create(Object.assign({
    headers: { 'Cache-Control': 'no-cache' },
    // cache will be enabled by default
    adapter: throttleAdapterEnhancer(axios.defaults.adapter, 2 * 1000)
  }, options))
})()

/* export default {
  install (Plugin, config = {}) {
    if (this.installed) {
      return
    }
    this.installed = true
    Plugin.http = http
  }
} */
