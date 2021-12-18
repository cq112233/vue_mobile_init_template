<template>
  <header>
    <div class="left flex">
      <slot name="left">
        left
      </slot>
    </div>
    <div class="main flex">
      <slot name="main">
        main
      </slot>
    </div>
    <div class="right flex">
      <slot name="right">
        right
      </slot>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  mounted() { }
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 88px;
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left {
    width: 60px;
    height: 100%;
    background: yellow;
  }
  .main {
    flex: 1;
    height: 100%;
    background: green;
  }
  .right {
    width: 60px;
    height: 100%;
    background: chocolate;
  }
}
</style>
