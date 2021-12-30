<template>
  <div>
    <keep-alive :include="keepAlivePages">
      <router-view :key="key" ref="router"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapState({
      keepAliveLayoutList: (state) => state.permission.keepAliveLayoutList,
      keepAlivePageList: (state) => state.permission.keepAlivePageList,
      keepAliveAsyncRouteList: (state) => state.permission.keepAliveAsyncRouteList
    }),
    keepAlivePages() {
      return this.keepAlivePageList.concat([
        ...this.keepAliveAsyncRouteList,
        ...this.keepAliveLayoutList
      ])
    },
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {},
  methods: {
    refresh() {
      this.$refs.router.$options.onPullDownRefresh &&
        this.$refs.router.$options.onPullDownRefresh.call(
          this.$refs.router,
          this.$refs.downRefresh.reset
        )
    }
  }
}
</script>

<style>
</style>
