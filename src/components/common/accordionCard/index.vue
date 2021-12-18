<template>
  <div class="accordionCard">
    <header @click="pullDown">
      <slot name="title">
        <div>
          标题
        </div>
      </slot>
    </header>
    <main class="content" :style="{ height: hg }">
      <div ref="main">
        <slot name="content">
          <div class="testContent">
            内容
          </div>
        </slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AccordionCard",
  data() {
    return {
      isShow: false,
      hg: 0
    };
  },
  mounted() { },
  methods: {
    pullDown() {
      this.isShow = !this.isShow;
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this.hg = this.$refs.main.offsetHeight + "px";
      } else {
        this.hg = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.accordionCard {
  .content {
    transition: all 0.5s;
    overflow: hidden;
    background: pink;
  }
  .testContent {
    height: 120px;
    background: pink;
  }
}
</style>
