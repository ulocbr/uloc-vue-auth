function createRouterListener (Plugin) {
  const firewallEnabled = () => Plugin.firewall.enabled
  const isAuthRoute = route => route.path.indexOf(Plugin.config.loginUrl) !== -1
  const isLogged = () => Plugin.logged

  const beforeEach = (to, from, next) => {
    let _next = function (opts = {}) {
      // console.log(to)
      const title = to && to.meta && to.meta.title// to.matched.slice().reverse().find(r => r.meta && r.meta.title)
      if (title) document.title = title
      next(opts)
    }

    if (!firewallEnabled()) { // no firewall
      console.log('Firewall is disabled')
      _next()
      return
    }
    if (!isLogged() && !Plugin.firewall.publicRoutes.includes(to.path)) { // Not logged
      if (Plugin.loggedIn()) { // Logged by local storage cache
        if (isAuthRoute(to)) {
          _next({
            path: '/'
          })
          return
        }
        _next()
      } else {
        if (isAuthRoute(to)) {
          _next()
          return
        }
        _next({
          path: Plugin.config.loginUrl,
          query: {redirect: to.fullPath}
        })
      }
    } else { // Is Logged or is Public Route
      if (isAuthRoute(to)) {
        _next({
          path: '/'
        })
        return
      }
      _next()
    }
  }

  return {
    firewallEnabled,
    isAuthRoute,
    isLogged,
    beforeEach
  }
}

export default {
  install (Plugin, Router) {
    const {beforeEach} = createRouterListener(Plugin)
    Router.beforeEach(beforeEach)
  }
}
