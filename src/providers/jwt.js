import {http} from '../lib/http'

/**
 * Provide wrapper for JWT authentication
 */
class JWTProvider { // TODO: Create Interface Provider
  constructor (config = {}) {
    this.token = null
    this.user = null
    this.urlApi = config.urlApi
    this.urlAuth = config.urlAuth || '/auth'

    http.defaults.baseURL = this.urlApi

    /* Check if JWT has expired */
    http.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      if (typeof error.response === 'undefined') {
        return Promise.reject(error)
      }
      if (error.response.data.status === 401) {
        if (error.response.data.detail === 'Invalid Token') {
          console.log('TOKEN EXPIRADO! Redirecionando...')
          // router.push('/logout')
          window.location = '/#/logout' // TODO: temporary
          // TODO: Apagar storage local com token e header http
          delete http.defaults.headers.common['Authorization']
          return false
        }
      }
      // Do something with response error
      return Promise.reject(error)
    })
  }

  /* get events () {
    return {
      loginByStorage: this.loginByStorage
    }
  } */

  auth (user, pass, extra = {}) {
    return new Promise((resolve, reject) => {
      return http.post(`${this.urlApi}${this.urlAuth}`,
        'user=' + user + '&pass=' + pass
      )
        .then(response => {
          let userData = response.data
          http.defaults.headers.common['Authorization'] = 'Bearer ' + userData.token
          return resolve(userData)
        })
        .catch(({response}) => {
          return reject(commomErrors(response))
        })
    })
  }

  loginByStorage (token = this.token, user = this.user) {
    console.log('Login by storage event', token, user)
    http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
}

const commomErrors = function (response) {
  let error = response.data ? response.data : response
  if (typeof error['detail'] !== 'undefined') {
    return error['detail']
  }
  return JSON.stringify(error)
}

export default JWTProvider
