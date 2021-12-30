<template>
  <div class="layout">
    <!-- 布局页 -->
    <nav-bars v-if="$route.fullPath.includes('page')"></nav-bars>
    <tab-bars v-else></tab-bars>
    <div :class="{ wrapper: !$route.fullPath.includes('page') }">
      <app-mains ref="appMains"></app-mains>
    </div>
  </div>
</template>

<script>
import { AppMains, TabBars, NavBars } from './components'
import config from '~/app.config'
import mixin from './mixin'
export default {
  mixins: [config.isBetterScroll ? mixin : {}],
  components: {
    AppMains,
    TabBars,
    NavBars
  },
  mounted() {},
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  methods: {}
}
</script>

<style scoped>
.wrapper {
  box-sizing: border-box;
  padding-bottom: 55Px;
}
</style>
