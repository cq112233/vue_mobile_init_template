<template>
  <div class="slider" ref="slider">
    <div class="process" :style="{ width }"></div>
    <div class="thunk" ref="trunk" :style="{ left }">
      <div class="block">111</div>
      <div class="tips">
        <span>{{ (scale * 100).toFixed(0) }}</span>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>
  </div>
</template>
<script>
/*
 * min 进度条最小值
 * max 进度条最大值
 * v-model 对当前值进行双向绑定实时显示拖拽进度
 * */
export default {
  name: "SliderCard",
  props: ["min", "max", "value"],
  data() {
    return {
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      per: this.value //当前值
    };
  },
  //渲染到页面的时候
  mounted() {
    this.slider = this.$refs.slider;
    this.thunk = this.$refs.trunk;
    var _this = this;
    this.thunk.ontouchstart = this.thunk.onmousedown = function (e) {
      var width = parseInt(_this.width);
      var disX = e.touches ? e.touches[0].clientX : e.clientX;
      document.ontouchmove = document.onmousemove = function (e) {
        // value, left, width
        // 当value变化的时候，会通过计算属性修改left，width

        // 拖拽的时候获取的新width
        var newWidth = e.touches
          ? e.touches[0].clientX
          : e.clientX - disX + width;
        // 拖拽的时候得到新的百分比
        var scale = newWidth / _this.slider.offsetWidth;
        console.log(scale);
        _this.per = ((_this.max - _this.min) * scale + _this.min).toFixed(0);
        _this.per = Math.max(_this.per, _this.min);
        _this.per = Math.min(_this.per, _this.max);
      };
      document.ontouchend = document.onmouseup = function () {
        document.ontouchmove = document.ontouchend = document.onmousemove = document.onmouseup = null;
      };
      return false;
    };
  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为 当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left = slider进度width + trunk宽度/2
    scale() {
      return (this.per - this.min) / (this.max - this.min);
    },
    width() {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.thunk.offsetWidth / 2 +
          "px"
        );
      } else {
        return 0 + "px";
      }
    }
  }
};
</script>
<style>
.slider {
  position: relative;
  margin: 0 auto;
  width: 600px;
  height: 20px;
  background: #e4e7ed;
  border-radius: 10px;
  cursor: pointer;
}
.slider .process {
  position: absolute;
  left: 0;
  top: 0;
  width: 224px;
  height: 20px;
  border-radius: 10px;
  background: #409eff;
}
.slider .thunk {
  position: absolute;
  left: 200px;
  top: -14px;
  width: 40px;
  height: 40px;
}
.slider .block {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #409eff;
  background: rgba(255, 255, 255, 1);
  transition: 0.2s all;
}
.slider .tips {
  position: absolute;
  left: -14px;
  bottom: 60px;
  min-width: 30px;
  text-align: center;
  padding: 8px 16px;
  background: #000;
  border-radius: 10px;
  height: 48px;
  color: #fff;
}
.slider .tips i {
  position: absolute;
  margin-left: -10px;
  left: 50%;
  bottom: -18px;
  font-size: 32px;
  color: #000;
}
.slider .block:hover {
  transform: scale(1.1);
  opacity: 0.6;
}
</style>
