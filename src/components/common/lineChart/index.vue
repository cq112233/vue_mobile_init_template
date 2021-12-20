<template>
  <div class="lineChart">
    <div ref="main" id="echartInstance"></div>
  </div>
</template>

<script>
// import * as echarts from 'echarts'
export default {
  name: 'lineChart',
  data() {
    return {
      myChart: null,
      option: null
    }
  },
  mounted() {
    this.init()
    this.$nextTick(() => {
      this.myChart.setOption(this.option)
    })
  },
  methods: {
    init() {
      this.option = {
        title: {
          id: 'title',
          show: true, // 是否显示标题组件。
          link: 'http://www.baidu.com',
          target: 'blank',
          text: '就餐大数据(预测):',
          textStyle: {
            color: '#333'
          },
          textAlign: 'auto',
          triggerEvent: false,
          paddingTop: [
            5, // 上
            10, // 右
            5, // 下
            10 // 左
          ]
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 'auto',
            margin: 14,
            color: '#999999'
          },
          data: ['10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30']
        },
        yAxis: {
          type: 'value',
          // 区域中的分隔线
          splitLine: {
            show: false
          },
          zlevel: 1,
          interval: 100000,
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function (value, index) {
              console.log(value, index)
              if (index === 0) {
                return '{leisure|' + '空闲' + '}'
              } else {
                return '{full|' + '爆满' + '}'
              }
            },
            rich: {
              leisure: {
                color: '#999999',
                fontWeight: 500,
                padding: [0, 0, 10, 0]
              },
              full: {
                fontWeight: 500,
                color: '#FE2A05',
                align: 'center',
                padding: [10, 0, 0, 0]
              }
            },
            showMinLabel: true,
            showMaxLabel: true,
            margin: 8,
            textStyle: {
              fontSize: 12,
              color: '#999999'
            }
            // data: [0, 2000]
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 4,
              cap: 'round',
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FF2600' // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: '#EDA99D' // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: '#E5E5E5' // 100% 处的颜色
                }
              ])
            }
          }
        },
        legend: {
          selectedMode: false,
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 10,
          data: ['昨日就餐数据', '当前就餐数据', '未来就餐预估'],
          itemGap: 8,
          itemWidth: 18,
          lineStyle: {
            width: 2,
            cap: 'round'
          },
          itemStyle: {
            opacity: 0 // 不显示圆球
          },
          textStyle: {
            padding: [0, 0, 0, 9]
          }
        },
        series: [
          // 背景线
          {
            z: 0,
            name: '昨日就餐数据',
            data: [0, 1032, 1001, 1034, 1190, 1130, 3220],
            type: 'line',
            symbol: 'none',
            smooth: 0.3,
            lineStyle: {
              color: '#D0D0D0',
              width: 3
            }
          },
          // 未完成的
          {
            z: 1,
            name: '未来就餐预估',
            data: [
              ['11:30', 901],
              ['12:00', 934],
              ['12:30', 1290],
              ['01:00', 1330],
              ['01:30', 1320]
            ],
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            symbol: 'none',
            smooth: 0.3,
            lineStyle: {
              color: '#95D5BD',
              width: 2
            }
          },
          // 完成的
          {
            z: 1,
            name: '当前就餐数据',
            smooth: 0.3,
            data: [0, 1932, 901],
            type: 'line',
            symbol: 'none',
            lineStyle: {
              color: '#00B893',
              width: 3
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#7CDBAA' // 0% 处的颜色
                },
                {
                  offset: 0.9,
                  color: '#F4FDF8' // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff' // 100% 处的颜色
                }
              ]) // 背景渐变色
            },
            markPoint: {
              symbol:
                'image://' +
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAYFBMVEUAAAD////////////////////////////////////////////////////////s9f3q8/pfrutfsOter+o6nOcwl+QmkeQmkuQkkuQkkeM9neY+nuY/nubF4vf2+v7///+zpzzHAAAAGXRSTlMADQ4iI0ZHUFFSW11eY2ZrbLS0tdzr+/v8TqXhjgAAAHhJREFUCB0FwYltAzEMADDqcRFk/1nbIj7LIQM6V86eB0G8FrD/rxLvBlQ/ymuJtVYhneqXWD+Z2UY/nfSqiDvrHJlNioxMzcqiBEJQeTgursvJh+POnePw9DAb7GFqsu4dzj7j8wn5ToD5nXJ3FrD/roDOlbPnwRe9dDpHErYAUAAAAABJRU5ErkJggg==',
              animationDurationUpdate: 500,
              symbolSize: 15,
              silent: true,
              data: [
                {
                  name: '当前就餐数据',
                  coord: ['11:30', 901]
                }
              ]
            }
          },
          {
            z: 1,
            name: 'level',
            type: 'line',
            animationDurationUpdate: 300,
            markLine: {
              symbol: 'none',
              animationDurationUpdate: 500,
              label: {
                z: 100,
                formatter: '901',
                color: '#00B893', //
                position: 'end',
                fontSize: 15,
                fontWeight: 'bold',
                distance: [0, 5]
              },
              silent: true,
              lineStyle: {
                color: '#00B893',
                width: 2
              },
              data: [
                [
                  { coord: [2, 0] }, // [x第几个（从0开始），y轴起始点 ]
                  { coord: [2, 901] } // [x第几个（从0开始），y轴起始点 ]
                ]
              ]
            }
          }
        ]
      }
      this.myChart = echarts.init(this.$refs.main)
      window.onresize = this.myChart.resize
    }
  }
}
</script>

<style lang="less" scoped>
.lineChart {
  #echartInstance {
    width: 100%;
    height: 50vh;
  }
}
</style>
