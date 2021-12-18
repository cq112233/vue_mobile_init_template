<template>
  <div class="loginCard">
    <div>
      <label for="">
        账号:
        <input type="text" v-model="username" />
      </label>
      <label for="">
        密码:
        <input type="text" v-model="password" />
      </label>
      <div @click="enter">
        登入
      </div>
      <div @click="getuserinfo">
        获取用户信息
      </div>
    </div>
  </div>
</template>

<script>
import { login, userinfo } from "../../../apis/index";
export default {
  props: {},
  name: "LoginCard",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    enter() {
      let data = {
        username: this.username,
        password: this.password
      };
      try {
        login(data).then(res => {
          console.log(res);
          localStorage.token = res.data.token;
        });
      } catch (err) {
        console.log(err);
      }
    },
    getuserinfo() {
      userinfo().then(res => {
        console.log(res);
      });
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="less" scoped></style>
