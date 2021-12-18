<template>
  <div class="noticeBars">
    <div class="wrarry">
      <ul :class="[{ dh: isShow }]" ref="animationBox">
        <li v-for="item of list" :key="item.id">
          {{ item.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeBars',
  props: {
    height: {
      type: [String, Number],
      default: 40
    }
  },
  data() {
    return {
      list: [
        { id: 1, content: '欢迎使用cq-vue-moblie-template' },
        { id: 2, content: '欢迎使用cq-vue-moblie-template' },
        { id: 3, content: '欢迎使用cq-vue-moblie-template' }
      ],
      isShow: false,
      animate: false
    }
  },
  mounted() {
    setInterval(() => {
      this.isShow = true
      setTimeout(() => {
        this.list.push(this.list[0])
        this.list.shift()
        this.isShow = false
      }, 1800)
    }, 2000)
  }
}
</script>

<style lang="less" scoped>
.noticeBars {
  .wrarry {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    background: antiquewhite;
    .dh {
      transition: all 0.5s;
      transform: translateY(-40px);
    }
    li {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
