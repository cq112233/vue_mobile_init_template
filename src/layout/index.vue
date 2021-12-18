<template>
  <div class="layout">
    <!-- 布局页 -->
    <div class="wrapper">
      <app-mains></app-mains>
    </div>
    <tab-bars></tab-bars>
  </div>
</template>

<script>
import { AppMains, TabBars } from './components'
import config from '~/app.config'
import mixin from './mixin'
export default {
  mixins: [config.isBetterScroll ? mixin : {}],
  components: {
    AppMains,
    TabBars
  }
}
</script>

<style scoped>
.layout {
  height: 100%;
}
.wrapper {
  box-sizing: border-box;
  padding-bottom: 120px;
}
</style>
