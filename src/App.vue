<template>
  <div id="app">
    <!-- 根组件 -->
    <router-view />
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
    return {}
  },

  watch: {},
  computed: {},
  mounted() {
    console.log(1)
  },
  methods: {}
}
</script>
<style lang="less" scoped>
#app {
  position: relative;
  width: 100%;
  height: 100%;
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
