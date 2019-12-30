export const Provider = {
  provider: null,
  defineProvider (Provider) {
    // TODO: Validate provider class
    this.provider = Provider
  },
  hasProvider () {
    return this.provider !== null
  },
  get () {
    return this.provider
  }
}

export default {
  install (Plugin) {
    Plugin.provider = Provider
  }
}
