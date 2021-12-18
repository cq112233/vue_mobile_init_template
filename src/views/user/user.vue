<template>
  <div class="user">
    <van-button @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { LOGOUT } from '@/store/modules/user'
import { resetIsGetAsyncRoutes } from '@/permission'
import commonMixin from '@/utils/mixin'
export default {
  props: {},
  name: 'user',
  mixins: [commonMixin],
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then((res) => {
        resetIsGetAsyncRoutes()
        this.routerReplace({ path: '/page/login' })
      })
    }
  },
  watch: {},
  computed: {}
}
</script>

<style lang="less" scoped>
</style>
