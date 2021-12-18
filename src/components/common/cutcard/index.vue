<template>
  <div class="cutcard">
    <nav class="cutcard_nav">
      <div v-for="(item, index) of listData" :key="index" @click="activeIndex = index" :class="{ checked: activeIndex === index }">
        {{ item.NavTitle }}
      </div>
    </nav>
    <main class="cutcard_main">
      <div v-for="(item, index) of listData.length" :key="index" v-show="activeIndex === index">
        {{ item }}
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "CutCard",
  props: {
    listData: {
      type: Array,
      default: () => {
        return [
          { NavTitle: "视频历史" },
          { NavTitle: "直播历史" },
          { NavTitle: "观看历史" }
        ];
      }
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  component: {},
  created() { },
  mounted() { },
  methods: {},
  watch: {},
  compouted() { }
};
</script>

<style lang="less" scoped>
.cutcard {
  width: 100%;
  height: 200px;
  background: chartreuse;
  .cutcard_nav {
    display: flex;
    align-items: center;
    height: 80px;
    background: #fff;
    & > div {
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      padding: 0 20px 0 20px;
      border-radius: 20px;
      transition: all 0.2s;
      color: #eee;
      &:hover {
        color: #73c9e5;
      }
    }
    .checked {
      font-size: 24px;
      background: #73c9e5;
      color: #fff !important;
    }
  }
}
</style>
