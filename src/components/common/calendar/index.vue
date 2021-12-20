<template>
  <div>
    <header>
      <h4 :style="{ textAlign: 'center', fontSize: '20px' }">
        <slot name="header"> 简约—日历 </slot>
      </h4>
      <div class="operation-month-btn">
        <van-button @click="handlerMonth(-1)">上个月</van-button>
        <van-button @click="resetMonth">重置</van-button>
        <van-button @click="handlerMonth(1)">下个月</van-button>
      </div>
    </header>
    <main>
      <div class="todayDate">{{ currentMonth.format('YYYY年MM月') }}</div>
      <!-- ["日", "一", '二', '三', '四', '五', '六'] -->
      <div class="header">
        <div
          v-for="(item, index) of weeksName"
          :key="index"
          class="header-item"
          :style="{ color: item === '日' || item === '六' ? 'red' : '' }"
        >
          {{ item }}
        </div>
      </div>
      <!-- 日历表 -->
      <div class="content">
        <div
          v-for="(item, index) of dateLists"
          :key="index"
          :class="[item.isRestDate ? 'restDateBox' : 'workDateBox', 'dateBox']"
          :style="{
            background: isToday(item) ? themeColor : undefined
          }"
          @click="selectDate(item)"
        >
          <span>{{ item.dateNumber }}</span>
          <span>
            {{ item.weekName }}
          </span>
          <span :class="[item.isRestDate ? 'restTag' : 'workTag']" v-if="!!item.weekName">
            {{ item.weekName === '周日' || item.weekName === '周六' ? '休' : '班' }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import mixin from '@/utils/mixin'
export default {
  name: 'CalendarCard',
  mixins: [mixin],
  data() {
    return {
      weeksName: ['日', '一', '二', '三', '四', '五', '六'],
      dateLists: [],
      currentMonth: this.moment()
    }
  },
  mounted() {
    // this.dateLists = this.getDateLists(moment().add(-1, 'months'))
    this.dateLists = this.getDateLists(this.moment())
  },
  methods: {
    isToday(date) {
      return (
        (date.momentDate && date.momentDate.format('YYYY/MM/DD')) ===
        this.moment().format('YYYY/MM/DD')
      )
    },
    // 上个月,下个月
    handlerMonth(diff) {
      this.currentMonth = this.currentMonth.add(diff, 'months')
      this.dateLists = this.getDateLists(this.currentMonth)
    },
    // 重置
    resetMonth() {
      this.currentMonth = this.moment()
      this.dateLists = this.getDateLists(this.moment())
    },
    // 选中某个日期
    selectDate(dateInstance) {
      console.log(dateInstance)
    },
    // 获取时间数据结构
    getDateLists(time) {
      // let timeClone = time.clone()
      const MonthNumber = this.getMonthNumber(time)
      const tempDateList = []
      for (let index = 1; index <= MonthNumber; index++) {
        const weekNameIndex = this.getTimeInWeekdayNumber(this.getDate(index, time))
        const weekName = this.getTimeInWeekday(this.getDate(index, time))
        const obj = {
          weekName, // 周日
          dateNumber: index, // 几号
          weekNameIndex, // 周几索引
          momentDate: this.getDate(index, time), // 时间对象
          isRestDate: !!(weekName === '周日' || weekName === '周六'), // 是否休息日
          isDisabled: false // 是否禁用
        }
        tempDateList.push(obj)
      }
      const fisrtLength = tempDateList[0].weekNameIndex
      console.log(tempDateList[0].weekNameIndex, 111)
      const lastLength = tempDateList[tempDateList.length - 1].weekNameIndex
      if (tempDateList[0].weekNameIndex !== 0) {
        for (let index = 0; index < fisrtLength; index++) {
          const obj = {
            weekName: '',
            dateNumber: '',
            weekNameIndex: ''
          }
          tempDateList.unshift(obj)
        }
      }
      if (lastLength !== 6) {
        for (let index = 0; index < 6 - lastLength; index++) {
          const obj = {
            weekName: '',
            dateNumber: '',
            weekNameIndex: ''
          }
          tempDateList.push(obj)
        }
      }
      return tempDateList
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.display-conter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.operation-month-btn {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.todayDate {
  margin: 20px 0;
  text-align: center;
  color: #000;
}

.header {
  display: flex;
  width: 100%;
}
.header-item {
  flex: 1;
  text-align: center;
  height: 100px;
  line-height: 100px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.dateBox {
  position: relative;
  flex-direction: column;
  height: 100px;
  width: 14.28vw;
  text-align: center;
  background: #fff;
  .display-conter();
}
.restDateBox {
  color: #c0c4cc;
}
.tag {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
}
.workTag {
  background: #409eff;
  .tag();
}
.restTag {
  background: #f56c6c;
  .tag();
}
</style>
