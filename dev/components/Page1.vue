<script>
export default {
  name: 'Page1',
  data () {
    return {}
  },
  computed: {},
  mounted () {
  },
  destroyed () {
  },
  methods: {},
  components: {}
}
</script>

<template>
  <u-page class="flex flex-center justify-center column">
    <h1>I'm page 1</h1>
    <div class="block w-full text-center m-t">
      <u-btn inline color="primary" @click="$router.push('/page1')">
        Page1
      </u-btn>
      <u-btn inline color="black" @click="$router.push('/page2')">
        Page2
      </u-btn>
    </div>
  </u-page>
</template>
