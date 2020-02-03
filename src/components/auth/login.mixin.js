export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      loginError: '',
      rememberMe: true,
      isLoading: false
    }
  },
  methods: {
    doLogin () {
      return new Promise((resolve, reject) => {
        const user = this.user
        this.isLoading = true
        if (!this.$uloc.auth) {
          throw new Error(`Uloc Auth Plugin is not installer. Use 'npm i --save uloc-vue uloc-vue-auth' and read documentation in https://github.com/ulocbr/uloc-vue-auth`)
        }
        this.$uloc.auth.login(user.email, user.password)
          .then((r) => {
            this.isLoading = false
            resolve(r)
          })
          .catch((error) => {
            this.isLoading = false
            this.user.password = ''
            reject(error)
          })
      })
    }
  },
  computed: {
    isValid: function () {
      const user = this.user
      return user.email.trim().length > 0 && user.password.trim().length > 0
    }
  },
  activated () {
    this.$refs.user.focus()
  }
}
