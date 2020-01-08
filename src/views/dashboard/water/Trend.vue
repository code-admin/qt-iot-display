<template>
  <div class="content">
    <div class="echart">
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
export default {
  name: 'Trend',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {

    };
  },
  computed: {
    options() {
      const data = this.data;
      const itmeName = [this.data.options[0].name, this.data.options[1].name];
      const options = {
        grid: {
          left: '1',
          right: '1',
          top: '12%',
          bottom: '2%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: itmeName,
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          type: 'category',
          data: data.reportTime,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei',
              fontSize: 13
            }
          },
          axisTick: {
            show: false // 隐藏X轴刻度
          },
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              color: '#355061',
              width: 1
            }
          }
        },
        yAxis: [{
          type: 'value',
          name: '次/天',
          splitNumber: 4,
          nameTextStyle: {
            color: '#ffffff'
          },
          position: 'left',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#355061'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#355061',
              width: 1
            }
          },
          axisTick: {
            show: false // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei',
              fontSize: 13
            }
          }
        }
        // {
        //   type: 'value',
        //   splitNumber: 4,
        //   gridIndex: 0,
        //   splitLine: {
        //     show: false
        //   },
        //   axisLine: {
        //     show: true,
        //     lineStyle: {
        //       color: '#354F60',
        //       width: 1
        //     }
        //   },
        //   axisTick: {
        //     show: false
        //   },
        //   axisLabel: {
        //     show: true,
        //     textStyle: {
        //       color: '#ffffff',
        //       fontFamily: 'Microsoft YaHei',
        //       fontSize: 13
        //     }
        //   }
        // }
        ],
        series: [{
          name: this.data.options[0].name,
          type: 'line',
          smooth: true,
          symbol: 'none',
          smoothMonotone: 'x',
          itemStyle: {
            color: '#00FFD5'
          },
          data: data.options[0].values,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(0,255,213,0.9)'
              },
              {
                offset: 0.95,
                color: 'rgba(0,255,213,0.33)'
              }
              ]
            }
          }

        }, {
          name: this.data.options[1].name,
          type: 'line',
          yAxisIndex: 0, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true,
          symbol: 'none',
          smoothMonotone: 'x',
          itemStyle: {
            color: '#E1FF4C'
          },
          data: data.options[1].values,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(246,255,127,0.9)'
              },
              {
                offset: 0.95,
                color: 'rgba(246,255,127,0.33)'
              }
              ]
            }
          }
        }]
      };
      return options;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
    height: 215px;
    display: flex;

    .echart {
        width: 100%;
        height: 100%;
    }

}

.echarts {
    width: 100%;
    height: 100%;
}
</style>
