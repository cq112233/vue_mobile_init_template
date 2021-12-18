<template>
  <div class="switch">
    <label>
      <input :checked="value" @change="handleModelInput" type="checkbox" />
      <div class="btn" :class="value ? 'checked' : ''"></div>
      <img :src="require(`./images/${imgState}.png`)" :class="value ? 'dui' : 'cuo'" alt="" />
    </label>
  </div>
</template>
<script>
export default {
  name: 'SwitchItem',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  methods: {
    handleModelInput (e) {
      this.$emit('change', e.target.checked)
    }
  },
  computed: {
    imgState () {
      return this.value ? 'dui' : 'cuo'
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.switch {
  label {
    position: relative;
    display: block;
    width: 80px;
    height: 40px;
    border: solid 2px #000;
    border-radius: 40px;
    background: #5ba7e7;
    &:hover {
      cursor: pointer;
    }
    & > .btn {
      position: absolute;
      width: 40px;
      height: 40px;
      background: #fff;
      border-radius: 50%;
      top: 0;
      left: 0;
      transition: all 0.2s ease;
    }
    .checked {
      transform: translateX(40px);
    }
    input {
      visibility: hidden;
    }
    .cuo {
      top: 50%;
      right: 14px;
    }
    .dui {
      top: 50%;
      left: 14px;
    }
    img {
      position: absolute;
      top: 0;
      right: 0;
      width: 14px;
      height: 14px;
      transform: translateY(-50%);

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
