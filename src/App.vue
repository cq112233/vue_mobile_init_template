<template>
  <div id="app">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p
        v-if="show"
        class="fade"
      >hello</p>
    </transition>
    <async-example />
    {{get}}
    <van-button type="info">信息按钮</van-button>
    <!-- 根组件 -->
    <div class="xx">11222</div>
    <keep-alive :include="['404']">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>
<script>
export default {
  name: 'App',
  // 向下获取app
  provide() {
    return {
      root: this
    }
  },
  data() {
    return {
      get: 1,
      show: false
    }
  },
  components: {
    // asyncExample:()=>import('./async-example')
  },
  watch: {},
  computed: {},
  mounted() {
    console.log(this.$router)
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.fade {
  position: fixed;
  width: 100%;
  height: 50vh;
  background-color: #fff;
  bottom: 0;
  left: 0;
  z-index: 1000;
  // transform: translateY(0%);
}
// 最终这些属性都会移除
.fade-enter-active,
.fade-leave-active {
  transition: transform 2s;
}
// 插入前 显示屏 刷新率
.fade-enter {
  transform: translateY(100%);
}
.fade-enter-to {
  transform: translateY(0%);
  color: red;
}
// 离开前插入前一帧
.fade-leave {
  transform: translateY(0%);
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}
.xx {
  color: @testColor;
}
.backTopArrow {
  right: 20px;
  bottom: 500px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: cadetblue;
  border-radius: 50%;
}
.kefu {
  position: fixed;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: bisque;
  right: 0;
  bottom: 20px;
  z-index: 1;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.4);
}
.active {
  font-size: 75px;
}
.test {
  color: aqua;
}
.ss {
  background: aquamarine;
}
</style>
