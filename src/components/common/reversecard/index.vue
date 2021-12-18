<template>
  <div class="reversecard">
    <div class="content">
      <img ref="img" src="../../../assets/images/img.jpg" alt="" @click="getDate" id="img" />
      <slot>
        <!-- <img ref="img" src="http://p.pstatp.com/origin/1383b0001f678ec069749" alt="" /> -->
        <!-- <img ref="img" src="../../../assets/images/img.jpeg" alt="" @click="getDate" /> -->

      </slot>
    </div>
  </div>
</template>

<script>
import EXIF from "exif-js"
export default {
  name: "ReverseCard",
  mounted() {
    // console.log(this.$refs.img);
    // EXIF(this.$refs.img)
    // setTimeout(() => {
    //   let that = this
    //   EXIF.getData(this.$refs.img, function () {
    //     EXIF.getAllTags(this);
    //     console.log(EXIF.getAllTags(that.$refs.img), 1);
    //     EXIF.getTag(this, 'Orientation');
    //   });
    // }, 4000);



  },
  methods: {
    getDate() {
      // EXIF.getData(this.$refs.img, function () {
      //   console.log(this);
      //   var make = EXIF.getTag(this, "Make");
      //   var model = EXIF.getTag(this, "Model");
      //   console.log(make, model);
      //   // var makeAndModel = document.getElementById("makeAndModel");
      //   // makeAndModel.innerHTML = `${make} ${model}`;
      // });
      // let data = EXIF.getAllTags(this.$refs.img)
      // console.log(data);
      let that = this
      // let data = EXIF.getAllTags(document.getElementById('img'))
      // console.log(data);
      EXIF.getData(this.$refs.img, function () {
        EXIF.getAllTags(this);
        console.log(EXIF.getAllTags(that.$refs.img));
        EXIF.getTag(this, 'Orientation');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.reversecard {
  perspective: 1000px;
  transform-style: preserve-3d;
  .content {
    width: 220px;
    height: 320px;
    background: greenyellow;
    transition: all 1s;
    border-radius: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06), 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  .content:hover {
    background: hotpink;
    transform: rotateY(180deg);
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}
</style>
