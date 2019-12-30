<script>
import { UBtn, UAjaxBar } from 'uloc-vue'
import LoginMixin from '../../login.mixin.js'

export default {
  mixins: [LoginMixin],
  components: { UAjaxBar, UBtn },
  methods: {
    __doLogin () {
      this.$refs.bar.start()
      this.doLogin()
        .then((r) => {
          console.log('SUCESSO LOGIN')
          console.log('Login is: ', r)
          // this.$refs.bar.stop() # No necessary because de instance is destroyed after login
          if (this.$route.query.redirect && this.$route.query.redirect !== '/logout') {
            this.$router.push({ path: this.$route.query.redirect })
          } else {
            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log('ERRO LOGIN')
          console.log('Login error', err)
          this.$emit('error', err)
        })
    }
  }
}
</script>

<template>
  <form class="form-login" @submit.prevent="__doLogin">
    <label for="username">Username:</label>
    <input type="text" id="username" name="_username" ref="user" autofocus v-model="user.email"
           placeholder="Nome de usuário, email ou código"
           class="input-login username"
           required
    >
    <div class="clearfloat" />
    <label for="password">Password:</label>
    <input type="password" id="password" name="_password" v-model="user.password"
           class="input-login password"
           placeholder="Senha" required
    >
    <div class="clearfloat" />
    <div class="s-i-l">
      <input type="checkbox" id="remember_me" name="_remember_me" value="on"
             class="lembrar" checked
      >
      <label for="remember_me">Continuar conectado</label>
    </div>

    <u-btn type="submit" class="btn-login" :disabled="!isValid">
      <span v-if="!isLoading">Entrar</span>
      <span v-if="isLoading">Aguarde...</span>
    </u-btn>
    <u-ajax-bar ref="bar" color="primary" />
  </form>
</template>
