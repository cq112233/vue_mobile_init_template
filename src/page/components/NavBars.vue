<template>
  <div class="nav">
    <van-nav-bar
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import commonMixin from '@/utils/mixin'
export default {
  mixins: [commonMixin],
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
      this.$toast('按钮')
    }
  }
}
</script>

<style>
</style>
