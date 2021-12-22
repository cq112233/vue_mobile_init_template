<template>
  <div>
    <!-- 下拉刷新 -->
    <downRefresh
      v-if="$route.meta.enablePullDownRefresh"
      @refresh="refresh"
      ref="downRefresh"
      :key="key"
    />
    <keep-alive :include="keepAliveLayoutList">
      <router-view :key="key" ref="router"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import downRefresh from 'downRefresh'
export default {
  components: {
    downRefresh
  },
  computed: {
    ...mapState({
      keepAliveLayoutList: (state) => state.permission.keepAliveLayoutList
    }),
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
