<template>
  <div class="downCard">
    <div class="title">
      <input type="text" v-model="coin" />
      <i class="fa fa-chevron-down" @click="isShow = !isShow"> </i>
    </div>
    <div class="content" :style="{ height: height }">
      <div ref="main">
        <!-- 插入的内容 -->
        <slot>
          <div>11</div>
          <div>21</div>
          <div>31</div>
          <div>41</div>
          <div>51</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coin: {
      type: String
    }
  },
  name: "DownCard",
  data() {
    return {
      isShow: false,
      height: 0
    };
  },
  components: {},
  created() { },
  mounted() { },
  methods: {},
  watch: {
    isShow(val) {
      if (val) {
        //转rem
        let data =
          this.$refs.main.offsetHeight /
          parseInt(document.documentElement.style.fontSize);
        this.height = data + "rem";
      } else {
        this.height = 0;
      }
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.downCard {
  position: relative;
  height: 60px;
  // overflow: hidden;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 320px;
  height: 60px;
  box-sizing: border-box;
  border: 2px solid #000;
  input {
    outline: 0;
  }
}
.content {
  position: absolute;
  top: 60px;
  left: 0;
  transition: all 0.4s;
  overflow: hidden;
}
</style>
