<template>
  <div class="page">
    <!-- 头部导航 -->
    <nav-bars v-if="!$route.meta.customNav" safe-area-inset-top></nav-bars>
    <!-- 布局页 -->
    <div class="wrapper">
      <app-mains></app-mains>
    </div>
  </div>
</template>

<script>
import { AppMains, NavBars } from './components'
export default {
  data() {
    return {}
  },
  components: {
    AppMains,
    NavBars
  },
  watch: {}
}
</script>

<style scoped>
</style>>
