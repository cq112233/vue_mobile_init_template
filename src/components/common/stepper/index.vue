<template>
  <div class="stepper">
    <!-- 减号 -->
    <div class="symbol minus" @click="des">
      <van-icon name="minus" color="#FFF" />
    </div>
    <!-- 数量 -->
    <div class="num">
      {{ value }}
    </div>
    <!-- 加号 -->
    <div class="symbol plus" @click="add">
      <van-icon name="plus" color="#FFF" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'input'
  },
  name: 'Stepper',
  watch: {},
  data() {
    return {
      showDot: false
    }
  },
  methods: {
    add(e) {
      this.showDot = true
      this.$emit('input', this.value + 1)
      this.$root.$emit('add', e.target)
    },
    des() {
      this.$emit('input', this.value - 1)
    }
  }
}
</script>

<style lang="less" scoped>
.dot-enter-active {
  transition: all 2s;
}
.dot-enter {
  left: 0;
  bottom: 0;
  // transform: translate(-50%);
}
.dot-enter-to {
  position: fixed;
  left: 50px;
  bottom: 50px;
}

.stepper {
  display: flex;
  justify-content: center;
  align-items: center;
  .symbol {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: darkcyan;
    border-radius: 50%;
  }
  .minus {
    background-color: #888888;
  }
  .num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
  }
  .plus {
    position: relative;
    background-color: #00c3ac;
  }
}
</style>
