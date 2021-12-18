<template>
  <div>
    <div class="btns">
      <van-button @click="handlerCount(1000)">go---> +1000</van-button>
      <van-button @click="handlerCount(-1000)">go---> -1000</van-button>
    </div>

    <div id="count" :style="{ color:colorGather.brand,textAlign:'center'}">
    </div>

  </div>

</template>

<script>

import { CountUp } from 'countup.js'
import mixin from '@/utils/mixin'
export default {
  name: 'CountUp',
  mixins: [mixin],
  props: {
    callback: {
      type: Function
    },
    updateNumber: {
      type: Number || String
    },
    endVal: {
      type: Number,
      default: 50000
    },
    startVal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    separator: {
      type: String,
      default: ''
    },
    separator: {
      type: Boolean,
      default: true
    },
    useEasing: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      instance: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handlerCount(num) {
      this.update(num)
    },
    init() {
      this.instance = new CountUp('count', this.endVal, {
        useGrouping: this.useGrouping,// 是否展示千分位
        useEasing: this.useEasing,// 使用缓和功能
        duration: this.duration, // 转换时长
        separator: this.separator,//千分位分割符
        startVal: this.startVal,//开始val
        prefix: this.prefix,//前缀
        suffix: this.suffix//后缀
      })
      this.instance.start()
    },
    // 暂停
    pauseResume() {
      this.instance.pauseResume()
    },
    // 开始
    start() {
      this.instance.start(() => {
        this.callback && this.callback(this.instance)
      })
    },
    //重置
    reset() {
      this.instance.reset()
    },
    //数字升级
    update(number) {
      this.instance.update(number)
    }
  }
}
</script>

<style lang='less' scoped>
// @import "../../../assets/theme/index.less";
.btns {
  // color: @warning;
}
</style>