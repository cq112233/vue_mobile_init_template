<template>
  <div class="lang">
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="英语" clickable @click="changeLang('en')">
          <template #right-icon>
            <van-radio name="en" />
          </template>
        </van-cell>
        <van-cell title="中文" clickable @click="changeLang('zh')">
          <template #right-icon>
            <van-radio name="zh" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
import { SET_LANG } from '@/store/modules/app'
import { vantLocales } from '@/i18n'
import commonMixin from '@/utils/mixin'
export default {
  name: 'lang',
  mixins: [commonMixin],
  data() {
    return {
      radio: this.$store.getters.app.lang
    }
  },
  computed: {},
  methods: {
    // 切换语言
    changeLang(lang) {
      this.$store.commit(SET_LANG, {
        lang
      })
      this.radio = lang
      this.$i18n.locale = lang
      vantLocales(lang)
      this.setLocalStore('LANG', lang)
    }
  }
}
</script>

<style lang="less" scoped>
.lang {
}
</style>
