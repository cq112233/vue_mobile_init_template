import BScroll from 'better-scroll'
import { setStyle } from '@/utils/domUtils'
export default {
  data() {
    return {
      el: null
    }
  },
  mounted() {
    setStyle(this.$el, {
      overflow: 'hidden'
    })
    this.$nextTick(() => {
      this.el = new BScroll(this.$el, {
        click: true,
        probeType: 3
      })
    })
  }
}
