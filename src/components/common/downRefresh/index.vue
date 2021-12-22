<template>
  <div id="downRefresh" :style="{ backgroundColor: themeColor }"></div>
</template>

<script>
import commonMixin from '@/utils/mixin'
export default {
  name: 'downRefresh',
  mixins: [commonMixin],
  data() {
    return {
      isApi: false,
      downLoad: null
    }
  },
  mounted() {
    this.downLoad = document.querySelector('#downRefresh')
    let startLocation = null
    document.ontouchstart = (e) => {
      if (this.isApi) return
      startLocation = e.touches[0].pageY
      this.downLoad.innerHTML = '下拉即可以刷新...'
    }
    document.ontouchmove = (e) => {
      if (this.isApi) return
      console.log(e.touches[0].pageY, startLocation)
      if (e.touches[0].pageY >= startLocation) {
        console.log(parseFloat(this.downLoad.offsetHeight))
        const height =
          parseFloat(this.downLoad.offsetHeight) + (e.touches[0].pageY - startLocation) * 1
        this.downLoad.style.height = height + 'px'
        if (height > 40) {
          this.downLoad.innerHTML = '释放即可以刷新...'
        }
        console.log('下拉')
        startLocation = e.touches[0].pageY
      } else {
        console.log('上拉')
        startLocation = e.touches[0].pageY
      }
    }
    document.ontouchend = () => {
      if (this.isApi) return
      if (this.downLoad.offsetHeight > 40) {
        this.downLoad.style.height = 40 + 'px'
        this.downLoad.innerHTML = '加载中...'
        this.isApi = true
        this.$emit('refresh')
      } else {
        this.downLoad.innerHTML = ''
        this.downLoad.style.height = 0
      }
    }
  },
  methods: {
    // 结束下拉刷新
    reset() {
      this.isApi = false
      this.downLoad.innerHTML = ''
      this.downLoad.style.height = 0
      // setTimeout(() => {

      // }, 200)
    }
  }
}
</script>

<style lang='less' scoped>
#downRefresh {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
  transition: all 0.2s linear;
  text-align: center;
}
</style>
