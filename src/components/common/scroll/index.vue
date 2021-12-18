<template>
  <div class="scrollItem" ref="scrollItem">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  name: "ScrollItem",
  data() {
    return {
      bs: null
    };
  },
  mounted() {
    if (!this.show) {
      this.bs = new BScroll(this.$refs.scrollItem, {
        click: true,
        tap: "top"
      });
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(bool) {
        if (!bool) {
          this.$nextTick(() => {
            this.bs = new BScroll(this.$refs.scrollItem, {
              click: true,
              tap: true
            });
          });
        }
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
