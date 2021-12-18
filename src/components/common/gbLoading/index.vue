<template>
  <div class="gbLoading">
    <van-overlay :show="value">
      <van-loading class="vanloading" vertical>
        {{text}}
      </van-loading>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: 'gbLoading',
  props: ['value', 'text'],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {}
  },
  methods: {
    onShow () {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="less" scoped>
.gbLoading {
  .vanloading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
