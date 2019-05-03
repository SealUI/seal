<template>
  <div id="animationContent" ref="animationContent" :style="style" @click.stop="clickEvent"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  name: 'SealLottie',
  props: {
    options: {
      type: Object,
      required: true
    },
    speed: String,
    height: Number,
    width: Number,
    styles: String
  },
  data() {
    return {
      animation: null,
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto'
      }
    }
  },
  computed: {
    opacityStyle() {
      return this.styles
    }
  },
  mounted() {
    // this.setWindowSize()
    this.animation = lottie.loadAnimation({
      container: this.$refs.animationContent,
      renderer: 'svg',
      loop: this.options.loop !== false,
      autoplay: this.options.autoplay !== false,
      animationData: this.options.animationData,
      path: this.options.path,
      assetsPath: this.options.assetsPath,
      rendererSettings: this.options.rendererSettings
    })

    this.$emit('created', this.animation)

    // 监听播放完成
    this.animation.addEventListener('complete', () => {
      this.$emit('completed')
    })

    //
    this.animation.addEventListener('config_ready', () => {
      this.$emit('configReady')
    })

    // 动画json文件加载完毕
    this.animation.addEventListener('data_ready', () => {
      this.$emit('dataReady')
    })

    this.animation.addEventListener('destroy', () => {
      this.$emit('destroy')
    })

    // 播放指定片段
    this.animation.addEventListener('segmentStart', () => {
      this.$emit('segmentStart')
    })

    this.animation.addEventListener('DOMLoaded', () => {
      this.$emit('domLoaded')
      this.$emit('canPlay', this.animation)
    })
  },
  beforeDestroy() {
    this.animation = null
  },
  methods: {
    clickEvent() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
#animationContent {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
}
</style>
