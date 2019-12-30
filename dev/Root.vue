<script>
import 'uloc-vue/dist/fonts.css'
import 'uloc-vue/dist/uloc.styl'
import 'assets/styl/app.styl'

export default {
  name: 'AppRoot',
  components: {},
  computed: {},
  mounted () {
    console.log(this.$uloc)
    window.setInterval(() => {
      // this.$uloc.auth.logged = true
      // console.log(this.$uloc.auth.session)
    }, 5000)
  },
  watch: {
    '$uloc.auth.logged': function (val) {
      console.log('Logged var has been updated', val)
    }
  }
}
</script>

<template>
  <div v-if="$uloc.auth.logged" id="uloc-app">
    <u-layout>
      <u-page-container>
        <router-view />
        <a @click="$router.push('/page1')">Page1</a><br>
        <a @click="$router.push('/page2')">Page2</a><br>
        <a @click="$router.push('/logout')">Logout</a>
      </u-page-container>
    </u-layout>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<style src="./assets/style.styl" lang="stylus"></style>
