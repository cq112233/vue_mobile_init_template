<template>
  <keep-alive :include="keepAlivePages">
    <router-view :key="key"></router-view>
  </keep-alive>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      keepAlivePageList: (state) => state.permission.keepAlivePageList,
      keepAliveAsyncRouteList: (state) => state.permission.keepAliveAsyncRouteList
    }),
    keepAlivePages() {
      return this.keepAlivePageList.concat(this.keepAliveAsyncRouteList)
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style>
</style>
