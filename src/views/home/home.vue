<template>
  <div>
    <div v-source='1' class="source" @click="source">1</div>
    <SlickList
      axis="x"
      v-model="fruits"
      :distance='5'
      class="menuContain"
      helperClass="menu-dragging"
    >
      <SlickItem
        v-for="(fruit, i) in fruits"
        :key="fruit"
        :index="i"
      >
        <div class="menu">
          <div class="label"> {{ fruit }}</div>
          <!-- <i
              :class="icons[iconStyl(item.url)]"
              style="font-size: 50px !important; color: #555"
            /> -->
        </div>
      </SlickItem>
    </SlickList>
    {{ text }}
    <van-button to="/page/lang">切换语言</van-button>
    <van-button :to="{ path: '/page/changeTheme' }">切换主题</van-button>

    <van-button :to="{ path: '/page/asyncRouteExample' }">asyncRouteExample</van-button>
    <van-button :to="{ path: '/page/asyncRouteExample1' }">asyncRouteExample1</van-button>

    <div @click="routerReplace()">显示自定义Toast</div>
    <van-button @click="getTop">获取top</van-button>
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
import { SlickList, SlickItem } from 'vue-slicksort'
import commonMixin from '@/utils/mixin'
import Test from 'Test'
import lineChart from 'lineChart'
import calendar from 'calendar'
export default {
  name: 'home',
  inject: ['root'],
  mixins: [commonMixin],
  data() {
    return {
      text: '',
      fruits: ['1', '2']
    }
  },
  components: {
    Test,
    calendar,
    lineChart,
    SlickList,
    SlickItem
  },
  mounted() { },
  beforeDestroy() { },
  deactivated() { },
  onShow() { },
  // 下拉刷新
  onPullDownRefresh(done) {
    setTimeout(() => {
      console.log(this, '结束')
      this.text = 111
      done()
    }, 5000)
  },
  // 页面滚动
  onPageScroll() { },
  // 触底
  onReachBottom() { },
  methods: {
    source() {
      console.log('xxxxx')
    },
    getTop() {
      console.log(document.body.scrollTop, 'top')
    },
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
@import url('~@/styles/custom.less');
.test {
  .display-column-center();
}
.menuContain {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  background-color: #fff;
  .menu {
    width: 188px;
    height: 250px;
    padding: 60px 0;
    cursor: pointer;
    text-align: center;
    border-right: 2px solid #efefef;
    border-bottom: 2px solid #efefef;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    box-sizing: border-box;
    .label {
      margin-bottom: 40px;
    }
  }
  // .operate-menu {
  //   width: 188px;
  //   height: 250px;
  //   border-right: 2px solid #efefef;
  //   border-bottom: 2px solid #efefef;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   cursor: pointer;
  //   color: #999;
  // }
}
.menu-dragging {
  width: 188px;
  height: 250px;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-align: center;
  border: 2px solid #efefef;
  font-size: 20px;
  box-sizing: border-box;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  .label {
    margin-bottom: 40px;
  }
}
.source {
  width: 100px;
  height: 100px;
  background: #efefef;
}
</style>
