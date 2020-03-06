<script>
import Login from './Forms/Login'
import ImageBg from './ImageBg'

// var moment = require('moment') // TODO: Removed in 0.0.2. Change to date-fcn

export default {
  name: 'Auth',
  components: {Login, ImageBg},
  props: {
  },
  data () {
    // this.now = moment().locale(this.lang) // TODO: Removed in 0.0.2. Change to date-fcn
    return {
      nowTime: this.now.format('HH:mm'),
      nowDate: this.now.format('ddd, DD [DE] MMM', 'pt_BR'),
      loginErrorData: null
    }
  },
  beforeCreate () {
    this.lang = this.$uloc ? this.$uloc.i18n.lang : 'pt-BR' // TODO: Desenvolver próprio sistema de línguas do Auth
  },
  mounted () {
    this.$nextTick(() => {
      this.timeInterval = setInterval(this.updateTime, 1000)
    })
  },
  beforeDestroy () {
    console.log('Destroy Login Instance')
    clearInterval(this.timeInterval)
  },
  methods: {
    updateTime () {
      // this.now = moment().locale(this.lang) // TODO: Removed in 0.0.2. Change to date-fcn
      this.nowTime = this.now.format('HH:mm')
      this.nowDate = this.now.format('ddd, DD [DE] MMM', 'pt_BR')
    },
    loginError (error) {
      console.log(error.name, error.message)
      this.loginErrorData = error.message
    }
  },
  computed: {
    isLogged: function () {
      return this.$uloc ? this.$uloc.auth.logged : this.$auth.logged
    },
    logoStyle: function () {
      let css = []
      console.log(this.logo)
      css.push({'background': this.logo})
      return css
    }
  }
}
</script>

<template>
  <div class="app-auth">
    <image-bg :image="'bg' + (Math.floor(Math.random() * 7) + 1) + '.jpg'" />
    <div class="container-login">
      <div class="logo">
        Uloc
      </div>

      <div class="d-t">
        <div class="d-r">
          <div class="d-c left">
            <div class="timer">
              <h1>{{ nowTime }}</h1>
              <h2>{{ nowDate }}</h2>
            </div>
          </div>

          <div class="d-c r">
            <div class="login-tab">
              <ul class="options">
                <li class="selected">
                  <a href="#" data-class="simple">Colaborador</a>
                </li>
                <li><a href="#" data-class="dev">Administração</a></li>
              </ul>
              <div class="clearfloat" />
              <div class="hdiv" />
              <div class="pcontent">
                <!-- if error -->
                <div v-if="null !== loginErrorData" class="login-errors">
                  <div>{{ loginErrorData }}</div>
                </div>
                <!-- endif -->
                <div id="login1">
                  <Login @error="loginError" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-bottom-left">
        <a href="#" class="recover-pw">Esqueci meu acesso</a>
        <!-- | <a href="#" class="recover-pw">Não tenho cadastro</a>-->
      </div>
      <div class="text-bottom-right">
        <a href="https://www.wtis.com.br" target="_blank" class="sponsored">Desenvolvido
          por Wtis</a>
      </div>
    </div>
  </div>
</template>
