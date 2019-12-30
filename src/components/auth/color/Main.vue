<script>
import {UBtn, UAjaxBar} from 'uloc-vue'
import LoginMixin from '../login.mixin.js'

export default {
  name: 'Auth',
  mixins: [LoginMixin],
  components: {UAjaxBar, UBtn},
  props: {},
  data () {
    return {
      loginErrorData: null
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
      this.doLogin()
        .then((r) => {
          console.log('SUCESSO LOGIN')
          console.log('Login is: ', r)
          // this.$refs.bar.stop() # No necessary because de instance is destroyed after login
          if (this.$route.query.redirect && this.$route.query.redirect !== '/logout') {
            this.$router.push({path: this.$route.query.redirect})
          } else {
            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log('ERRO LOGIN')
          console.log('Login error', err)
          this.loginErrorData = err.message || 'Ocorreu algum erro no login'
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
  <div class="app-auth-color">
    <slot>
      <slot name="header">
        <div class="auth-header text-center">
          <slot name="logo">
            <a class="logo">Uloc</a>
          </slot>
        </div>
      </slot>
      <slot name="container">
        <div class="auth-container">
          <slot name="content">
            <div class="auth-content">
              <slot name="title">
                <h1 class="title">
                  Iniciar sessão
                </h1>
              </slot>
              <slot name="form">
                <form class="auth-form" method="post" @submit.prevent="__doLogin">
                  <div id="normal_login_contents">
                    <slot name="cadastro-btn">
                      <div>
                        <u-btn no-caps color="primary" :tabindex="0" class="btn-def">
                          Cadastre-se
                        </u-btn>
                      </div>
                    </slot>
                    <div class="auth-separator">
                      ou
                    </div>
                    <div v-if="null !== loginErrorData" class="login-errors">
                      <div>{{ loginErrorData }}</div>
                    </div>
                    <div class="form-input">
                      <slot name="emailLabel">
                        <label>Endereço de e-mail, CPF ou apelido</label>
                      </slot>
                      <input autofocus tabindex="1" type="text" name="e" v-model="user.email" :disabled="isLoading">
                    </div>
                    <span class="field-no-status" />
                    <div class="form-input">
                      <slot name="passwordLabel">
                        <label>Senha</label>
                      </slot>
                      <input tabindex="2" type="password" v-model="user.password" :disabled="isLoading">
                      <span class="input--help">
                        <a href="#" tabindex="-1"><slot name="forgotPasswordLabel">Esqueceu a senha?</slot></a>
                      </span>
                    </div>
                    <div class="form-input text-right">
                      <u-btn no-caps color="primary" class="btn-def login" type="submit" :tabindex="3"
                             :disabled="!isValid || isLoading"
                      >
                        <span>Iniciar sessão</span>
                      </u-btn>
                    </div>
                  </div>
                </form>
              </slot>
            </div>
          </slot>
          <slot name="footer">
            <div class="auth-footer">
              © 2018-present Uloc Software
            </div>
          </slot>
        </div>
      </slot>
      <u-ajax-bar ref="bar" color="primary" />
    </slot>
  </div>
</template>
