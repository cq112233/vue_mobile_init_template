<template>
  <div>
    <div
      class="cqPopup"
      v-show="value"
      :class="[value ? 'showOverly' : '']"
      @click.self="$emit('input', false)"
    ></div>
    <section :class="[position, value ? 'show' : '', 'default']">
      <header>标题</header>
      <div>内容</div>
      <footer>
        <div>取消</div>
        <div>确认</div>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CqPopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'center'
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.position {
  position: absolute;
  background-color: #fff;
}
.cqPopup {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 3s;
}
.showOverly {
  background-color: rgba(0, 0, 0, 0.5);
}
.default {
  z-index: 10000;
}
.center {
  .position();
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.top {
  .position();
  top: 0;
  left: 0;
  width: 100%;
  transform: translate3d(0, -100%, 0);
  transition: all 0.3s linear;
  &.show {
    transform: translate3d(0, 0, 0);
  }
}
.right {
  .position();
  top: 0;
  right: 0;
  height: 100%;
  transform: translate3d(100%, 0, 0);
  transition: all 0.3s linear;
  &.show {
    transform: translate3d(0, 0, 0);
  }
}
.left {
  .position();
  top: 0;
  left: 0;
  height: 100vh;
  transform: translate3d(-100%, 0, 0);
  transition: all 0.3s linear;
  &.show {
    transform: translate3d(0, 0, 0);
  }
}
.bottom {
  .position();
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translate3d(0, 100%, 0);
  transition: all 0.3s linear;
  &.show {
    transform: translate3d(0, 0, 0);
  }
}
</style>
