import {LocalStorage} from 'uloc-vue'
import {Provider} from './provider'
import Plugin from '../globals.js'

LocalStorage.install({$uloc: {}})

export const fakeUser = {
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJ1c2VybmFtZSI6IlRJQUdPRkVMSVBFIiwiZXhwIjoxNTM1ODIxNzEwLCJpYXQiOiIxNTM1NzM1MzEwIn0.KZ2Md2W62Py_gOk8mgl1Wjdq7HJuPRKccDyiDRgoEkkPDnyauzqKrW-_vNU-LHHU5ze5uc267V8Q8L7kPVrrzUp-dkEOTujPTh_JFRiJMWpAvVvLx8tKbrLLhU7l4W_-b71-IywEcSZnWLaa7ys-0GToSB2OgKAvi1QEhDfDFxsi4qsVz1xwzw3jS7FtDixFcuuCDizP-ZoGZw5W68sz6SwWAt6ficD_mnPTf8Bn3kNvPlZla-aogHdH5WkdVRahWChf22ffvg73OmZGL6ipEpYNc0F4m5yYBmfl2QjkMVE8Uo3UxTmYvX2kxATkpIe4SJ4Mi5JkmT7r13mlhkJq4OZDAYF4G4AFWE53l2_IcwbSP-VvKo-11EbbUQMC_4XFkZS8t6FJVXJfgpfn050ZNFPQwwTooqa2Bn1iSuMXJYDW6eAWzl8C7mkBIp59aO7P3DuQvefehKP6S9CpOF5Z2CpbdG91PsDXTmVrjjoKxsAKxpqPUIVb84oUPHz06fkyEn077C8cIutxuefjV-8829AxPtr4EYBhK9SmNayRrg7PEez3viCPzuk_i1A0QwlrwxyS1uKLlEmfQmm0NfN7skzm4FacpWaxTKktM8Aq9bEGab2E4JmDX7sBXXw5bWLRtx3RWi8rN1jAXf4KjHXtulAe0PU2YOnUo8XOzPwE3Es',
  user: {
    id: 1,
    name: 'Tiago Felipe Amorim Moreira Reis',
    email: 'tiago@tiagofelipe.com',
    photo: 'https://www.gravatar.com/avatar/d44da719b07b48fe9cd4eedab5fcb7f3',
    roles: ['ROLE_ADMIN'],
    acl: [
      'vendas.caixa.abrir',
      'vendas.caixa.movimentar'
    ]
  },
  extra: {}
}

function createAuthenticator () {
  return {

    session: {},

    /**
     * Try to login
     * If LoginProvider is not defined, login parse with fake user
     * @param user
     * @param pass
     * @param config
     * @return Promise
     */
    login: async function (user, pass, config = {}) {
      let authUser

      // Check if user exists in local storage
      if (this.loginByStorage()) {
        return
      }

      if (!Provider.hasProvider()) {
        console.log('No provider to authentication. Fake Login used to next')
        authUser = fakeUser
      } else {
        try {
          authUser = await Provider.get().auth(user, pass, config)
        } catch (e) {
          throw new Error(e)
        }
      }
      Plugin.logged = true
      this.save(authUser)
      return authUser
    },

    /**
     * Try to login by local storage cache
     * @return {boolean}
     */
    loginByStorage () {
      if (this.getToken() && this.getUser()) {
        console.log('User and Token loaded by local storage')
        // Call loginByStorage event in Auth Provider
        let session = {
          token: this.getToken(),
          user: this.getUser()
        }
        if (this.session.id || LocalStorage.get.item('auth.id')) {
          session.id = this.session.id || LocalStorage.get.item('auth.id')
        }
        if (Provider.hasProvider()) {
          if (typeof Provider.get().loginByStorage === 'function') {
            Provider.get().loginByStorage(session.token, session.user)
          }
        }
        Plugin.logged = true
        this.save(session)
        return true
      }
      return false
    },

    save (session) {
      this.session = session
      LocalStorage.set('auth.token', session.token)
      LocalStorage.set('auth.user', session.user)
      session.id && LocalStorage.set('auth.id', session.id)
      return this
    },

    getToken () {
      return this.session.token || LocalStorage.get.item('auth.token')
    },
    getUser () {
      return this.session.user || LocalStorage.get.item('auth.user')
    },

    logout (callback) {
      LocalStorage.remove('auth.token')
      LocalStorage.remove('auth.user')
      this.session = {}
      Plugin.logged = false
      window.setTimeout(() => {
        if (typeof callback === 'function') {
          callback()
        }
      }, 300)
    },

    loggedIn () {
      if (!this.logged) {
        // Check if is possible to auto-login by cache in local storage
        return this.loginByStorage()
      }
      return this.logged
    }
  }
}

export default {
  install (Plugin, Router, config = {}) {
    if (this.installed) {
      throw new Error('Authenticator has already installed')
    }
    this.installed = true
    Object.assign(Plugin, createAuthenticator.call(Plugin))
  }
}
