<template>
  <div class="navcard">
    <div class="navcard_content">
      <div class="item1">
        <slot>标题</slot>
      </div>
      <div class="item2">
        <slot>详情介绍</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  name: "NavCard",
  data() {
    return {};
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
.navcard {
  .navcard_content {
    position: relative;
    width: 100px;
    height: 60px;
    color: #ffffff;
    background: transparent;
    transition: all 0.5s;
    transform-style: preserve-3d;
    .item1 {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      // background: red;
      background-image: url("./images/image1.jpg");
      background-size: 100% 100%;
      transform: translateZ(30px);
    }
    .item2 {
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-image: url("./images/image2.jpg");
      background-size: 100% 100%;
      transform: translateY(30px) rotateX(-90deg);
      // background: greenyellow;
      z-index: 1;
    }
  }
  .navcard_content:hover {
    transform: rotateX(90deg);
  }
}
</style>
