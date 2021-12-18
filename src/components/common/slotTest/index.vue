<template>
  <div class="slotTest">
    <slot name='header' :prop='user'>
      <p>lisi</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'slotTest',
  data () {
    return {
      user: {
        name: 'zhangsan',
        age: 18
      }
    }
  },
  mounted () {
    console.log(this.$slots, 'slots')
  }
}
</script>

<style lang="less" scoped>
  .slotTest {

  }
</style>
