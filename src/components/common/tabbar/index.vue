<template>
  <div class="tabbar">
    <div v-for="(item, index) of listData" :key="item.title" @click="active(index, item.path)">
      <img :src="item.img" alt="" v-show="activeIndex !== index" />
      <img :src="item.ActiveImg" alt="" v-show="activeIndex === index" />
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    listData: {
      type: Array,
      default: () => {
        return [
          {
            title: "首页",
            img: require("./images/home.png"),
            ActiveImg: require("./images/acthome.png"),
            path: "/"
          },
          {
            title: "推荐",
            img: require("./images/tuijian.png"),
            ActiveImg: require("./images/acttuijian.png"),
            path: "/star"
          },
          {
            title: "购物车",
            img: require("./images/gou.png"),
            ActiveImg: require("./images/actgou.png"),
            path: "/buy"
          },
          {
            title: "我的",
            img: require("./images/me.png"),
            ActiveImg: require("./images/actme.png"),
            path: "/user"
          }
        ];
      }
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  mounted() {
    console.log(3, window.$app);
  },
  methods: {
    active(val, path) {
      this.activeIndex = val;
      this.$router.push({ path, query: { id: val } });
    }
  }
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 768px) {
  .tabbar {
    width: 10rem !important;
  }
}
.tabbar {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 2px solid #eeeeee;
  background: #fff;
  & > div {
    height: 100px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-bottom: 4px;
    }
  }
}
</style>
