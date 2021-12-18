<template>
  <div class="login">
    <header>
      <h3>使用手机号登录</h3>
      <h4 @click="changeRole">{{ role === 1 ? '管理员登入' : '员工登入' }}</h4>
    </header>
    <section>
      <van-cell-group inset>
        <van-field
          label-class="label_width"
          v-model="phone"
          label="用户名"
          placeholder="请输入用户名"
          type="tel"
        />
        <van-field
          label-class="label_width"
          v-model="password"
          label="密码"
          placeholder="请输入用户名"
          type="password"
        />
      </van-cell-group>
    </section>
    <footer>
      <van-button type="primary" @click="onSubmit">登录</van-button>
      <router-link :to="{ path: '/' }">忘记密码</router-link>
      <router-link :to="{ path: '/page/jtRegister' }">注册</router-link>
    </footer>
    <!-- <van-popup v-model="show"></van-popup> -->
  </div>
</template>

<script>
import { LOGIN } from '@/store/modules/user'
import commonMixin from '@/utils/mixin'
export default {
  name: 'login',
  mixins: [commonMixin],
  data() {
    return {
      phone: '',
      password: '',
      role: 1 // 1 admin 2 em
    }
  },
  methods: {
    changeRole() {
      if (this.role === 1) {
        this.role = 2
      } else {
        this.role = 1
      }
    },
    onSubmit(val) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中'
      })
      // 登录
      this.$store
        .dispatch(LOGIN, {
          phone: escape(this.phone),
          password: escape(this.password),
          roleId: this.role
        })
        .then((res) => {
          const backPath = this.$route.query.redirect || '/layout/home'
          this.$router.replace({ path: backPath })
        })
        .catch(() => {
          this.$toast('登入失败')
        })
    }
  }
}
</script>

<style>
.page {
  height: 100%;
  background-color: #fff;
}
</style>
<style lang="less" scoped>
.login {
  overflow: hidden;
  header {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    font-size: 60px;
    margin: 100px 0;
    text-align: center;
  }
  section {
    /deep/ .label_width {
      width: 3em !important;
    }
  }
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    .van-button {
      width: 80%;
      height: 100px;
    }
    a {
      margin-top: 20px;
      color: #000;
    }
  }
}
</style>
