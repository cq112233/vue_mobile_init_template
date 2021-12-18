<template>
  <transition name="fade">
    <div class="cq-toast" v-show="isShow">
      <span> {{ msg }} </span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {},
  name: '',
  data() {
    return {
      msg: '',
      isShow: false,
      timer: null
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    success(msg) {
      if (typeof msg !== 'string') throw new Error('要字符串')
      this.msg = msg || '成功'
      this.isShow = true
      this.closeShow()
    },
    fail() {},
    loading() {},
    closeShow() {
      this.timer = setTimeout(() => {
        this.isShow = false
      }, 2000)
    },
    clear() {
      clearTimeout(this.timer)
      this.isShow = false
    },
    allowMultiple() {},
    setDefaultOptions() {},
    resetDefaultOptions() {}
  },
  watch: {},
  computed: {}
}
</script>

<style lang="less" scoped>
.cq-toast {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
