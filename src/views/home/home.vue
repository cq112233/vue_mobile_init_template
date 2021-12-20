<template>
  <div>
    <van-button to="/page/lang">切换语言</van-button>
    <van-button :to="{ path: '/page/changeTheme' }">切换主题</van-button>

    <van-button :to="{ path: '/page/asyncRouteExample' }">asyncRouteExample</van-button>
    <van-button :to="{ path: '/page/asyncRouteExample1' }">asyncRouteExample1</van-button>

    <div @click="routerReplace()">显示自定义Toast</div>
    <div class="test"><span>1</span><span>2</span></div>
    <i class="icon icon-shoucang1"></i>
    <div :style="{ color: themeColor }">12333</div>
    <lineChart />
    <Test />
    <calendar />
  </div>
</template>

<script>
import { getJson } from '@/apis'
import commonMixin from '@/utils/mixin'
import Test from 'Test'
import lineChart from 'lineChart'
import calendar from 'calendar'
export default {
  name: 'home',
  inject: ['root'],
  mixins: [commonMixin],
  data() {
    return {}
  },
  components: {
    Test,
    calendar,
    lineChart
  },
  mounted() {},
  onShow() {
    console.log(this, 'onShow')
  },
  beforeDestroy() {},
  deactivated() {},
  methods: {
    showToast() {
      this.$cqToast.success('成功')
      setTimeout(() => {
        this.$cqToast.clear()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/assets/css/custom.less');
.test {
  .display-column-center();
}
</style>
