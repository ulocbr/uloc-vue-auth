<script>
var images = (src, image) => src.filter((v) => v.endsWith(`${image}`))
export default {
  name: 'ImageBg',
  props: {
    image: String,
    imageSrc: {
      type: Array,
      default: () => {
        let arr = []
        let url = 'https://www.tiagofelipe.com/code/uloc-vue-auth/bg/'
        let i = 1
        while (i <= 7) {
          arr.push(`${url}bg${i}.jpg`)
          i++
        }
        return arr
      }
    }
  },
  data () {
    return {
      imageBG: '',
      isLoading: true,
      src: ''
    }
  },
  computed: {},
  mounted () {
    this.src = images(this.imageSrc, this.image)
    this.$nextTick(() => {
      let img = new Image()
      img.src = this.src
      img.onload = () => {
        this.isLoading = false
        this.imageBG = 'background-image:url("' + img.src + '")'
      }
    })
  },
  destroyed () {
  },
  methods: {},
  components: {}
}
</script>

<template>
  <div class="bg" :class="{'is-loading' : isLoading}" :style="imageBG" />
</template>
