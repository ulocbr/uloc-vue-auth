<script>
import { UBtn, UAjaxBar, UCheckbox } from 'uloc-vue'
import LoginMixin from '../login.mixin.js'
import LogoUloc from './Logo'

export default {
  name: 'Auth',
  mixins: [LoginMixin],
  components: { LogoUloc, UAjaxBar, UBtn, UCheckbox },
  props: {},
  data () {
    return {
      loginErrorData: null,
      isSubmiting: false
    }
  },
  beforeCreate () {
    this.lang = this.$uloc ? this.$uloc.i18n.lang : 'pt-BR' // TODO: Desenvolver próprio sistema de línguas do Auth
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    __doLogin () {
      this.$refs.bar.start()
      this.isSubmiting = true
      this.doLogin()
        .then((r) => {
          if (this.$route.query.redirect && this.$route.query.redirect !== '/logout') {
            this.$router.push({ path: this.$route.query.redirect })
          } else {
            this.$router.push('/')
          }
          this.isSubmiting = false
        })
        .catch((err) => {
          this.isSubmiting = false
          console.log('ERRO LOGIN')
          console.log('Login error', err)
          this.loginErrorData = err.message || 'Ocorreu algum erro no login'
          this.$refs.bar.stop()
          this.$uloc.notify({
            type: 'negative',
            message: this.loginErrorData
          })
        })
    }
  },
  computed: {
    isLogged: function () {
      return this.$uloc ? this.$uloc.auth.logged : this.$auth.logged
    }
  }
}
</script>

<template>
  <div class="app-auth-uloc">
    <div class="hidden-xs hidden-sm b-col-md-6 fundo tela"></div>
    <div class="b-col-md-6 novidades tela">
      <div class="conteudo hidden-xs hidden-sm">
        <div class="contexto">
          <slot name="login-message">
            <p class="bem-vindo">Bem-vindo ao Uloc Auth!</p>
            <p class="mensagem">Mais um dia incrível para seus projetos!</p>
            <p class="mensagem">:)</p>
          </slot>
        </div>
      </div>
    </div>
    <div class="regiao-login animated">
      <div class="logo">
        <slot name="logo">
          <a class="logo-image"><logo-uloc/></a>
        </slot>
      </div>

      <div class="login-form wrapper-lg">
        <form class="auth-form" method="post" @submit.prevent="__doLogin">
          <u-field
            :label-width="12"
            label="Login"
          >
            <u-input required type="text" v-model="user.email" autofocus />
          </u-field>
          <u-field
            :label-width="12"
            label="Senha de acesso"
            class="m-t-lg"
          >
            <u-input required type="password" v-model="user.password" />
          </u-field>

          <div class="text-left m-t-xxl">
            <u-checkbox label="Lembrar-me deste computador" v-model="rememberMe"></u-checkbox>
          </div>
          <u-btn :disabled="isSubmiting" type="submit" color="green" size="md" icon-right="keyboard_arrow_right" label="Entrar"
                 class="w-full m-t btn-login"></u-btn>
        </form>
      </div>
    </div>
    <u-ajax-bar ref="bar" color="primary" />
  </div>
</template>
