<template>
  <div class="change-theme">
    <van-button @click="changeTheme('defualt')">默认</van-button>
    <van-button @click="changeTheme('red')">红色</van-button>
    <van-button @click="changeTheme('green')">绿色</van-button>
    <van-button @click="changeTheme('blue')">蓝色</van-button>
    <van-button @click="changeTheme('orange')">橙色</van-button>
  </div>
</template>

<script>
import { SET_THEME } from '@/store/modules/app'
import commonMixin from '@/utils/mixin'
export default {
  name: 'changeTheme',
  props: ['id'],
  mixins: [commonMixin],
  data() {
    return {}
  },
  methods: {
    changeTheme(theme) {
      this.$store.dispatch(SET_THEME, theme).then((res) => {
        this.$toast.success(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
