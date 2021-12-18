<template>
  <keep-alive :include="keepAliveLayoutList">
    <router-view :key="key"></router-view>
  </keep-alive>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      keepAliveLayoutList: (state) => state.permission.keepAliveLayoutList
    }),
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style>
</style>
