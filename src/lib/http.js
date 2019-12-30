import axios from 'axios'

export const http = (function (options) {
  return axios.create(Object.assign({}, options))
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
