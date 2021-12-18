<template>
  <div class="sendcode" :class="{ bonus1: isbonus }">
    <van-button :loading="loading" @click="sendCode" :disabled="disabled"
      >{{ s }}
    </van-button>
  </div>
</template>

<script>
export default {
  name: "SendCode",
  props: {
    start: Boolean,
    loading: Boolean,
    disabled: Boolean,
    isbonus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      s: "发送验证码",
      myStart: false,
      timer: null
    };
  },
  methods: {
    sendCode() {
      if (!this.myStart) {
        this.$emit("sendCode");
      }
    }
  },
  watch: {
    start(newVal) {
      this.myStart = newVal;
    },
    myStart(newVal) {
      if (newVal) {
        this.s = 60;
        this.timer = setInterval(() => {
          this.s = --this.s;
        }, 1000);
      }
    },
    s(newVal) {
      if (newVal === 0) {
        this.s = "获取验证码";
        this.$emit("changeStart", false);
        this.myStart = false;
        clearInterval(this.timer);
      }
    },
    disabled(newVal) {
      this.disabled = newVal;
    }
  },
  beforeDestroy() {
    this.$emit("changeStart", false);
    this.myStart = false;
    clearInterval(this.timer);
  }
};
</script>

<style lang="less">
.bonus1 {
  background: #426bff !important;
  .van-button {
    width: 100%;
    height: 0.92rem;
    background-color: #426bff !important;
    border: 0;
    color: #fff;
    .van-button__content {
      background-color: #426bff !important;
      width: 100%;
    }
  }
}

.sendcode {
  text-align: center;
  font-size: 0.28rem;
  font-family: PingFang SC, sans serif;
  font-weight: bold;
  line-height: 0.92rem;
  color: rgba(0, 0, 0, 1);
  width: 2.12rem;
  height: 0.92rem;
  background: rgba(235, 200, 144, 1);
  opacity: 0.9;
  border-radius: 4px;
}
</style>
