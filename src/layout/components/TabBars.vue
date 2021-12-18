<template>
  <van-tabbar v-model="active" :safe-area-inset-bottom="true">
    <van-tabbar-item icon="home-o" name="home" replace to="/layout/home">
      <span :style="{ color: currentRoute === '/layout/home' ? themeColor : '#666' }">{{
        $t('layout.tabbar.home')
      }}</span>
      <template v-slot:icon="props">
        <van-icon name="wap-home-o" size="24" :color="props.active ? themeColor : '#666'" />
        <!-- <img :src="active ? home.ActiveImg : home.img" /> -->
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" name="star" replace to="/layout/star">
      <span :style="{ color: currentRoute === '/layout/star' ? themeColor : '#666' }">{{
        $t('layout.tabbar.recommend')
      }}</span>
      <template #icon="props">
        <van-icon
          class-prefix="iconfont"
          name="tuijiandianpu"
          size="24"
          :color="props.active ? themeColor : '#666'"
        />
        <!-- <img :src="props.active ? star.ActiveImg : star.img" /> -->
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="buy" replace to="/layout/buy">
      <span :style="{ color: currentRoute === '/layout/buy' ? themeColor : '#666' }">{{
        $t('layout.tabbar.shoppingCart')
      }}</span>
      <template #icon="props">
        <van-icon name="shopping-cart-o" size="24" :color="props.active ? themeColor : '#666'" />
        <!-- <img :src="props.active ? buy.ActiveImg : buy.img" /> -->
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="user" replace to="/layout/user">
      <span :style="{ color: currentRoute === '/layout/user' ? themeColor : '#666' }">{{
        $t('layout.tabbar.my')
      }}</span>
      <template #icon="props">
        <van-icon name="manager-o" size="24" :color="props.active ? themeColor : '#666'" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import commonMixin from '@/utils/mixin'
export default {
  mixins: [commonMixin],
  data() {
    return {
      active: 'home',
      home: {
        img: require('./images/home.png'),
        ActiveImg: require('./images/acthome.png')
      },
      star: {
        img: require('./images/tuijian.png'),
        ActiveImg: require('./images/acttuijian.png')
      },
      buy: {
        img: require('./images/gou.png'),
        ActiveImg: require('./images/actgou.png')
      },
      user1: {
        img: require('./images/me.png'),
        ActiveImg: require('./images/actme.png')
      }
    }
  },
  watch: {
    $route: {
      handler(newVal) {
        switch (newVal.path) {
          case '/':
            this.active = 'home'
            break
          case '/layout/star':
            this.active = 'star'
            break
          case '/layout/buy':
            this.active = 'buy'
            break
          case '/layout/user':
            this.active = 'user'
            break
          default:
            break
        }
      },
      immediate: true
    }
  },
  mounted() {},
  computed: {
    currentRoute() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
</style>
