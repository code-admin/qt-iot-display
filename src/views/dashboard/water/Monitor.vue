<template>
  <div class="content">
    <div class="echart">
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
export default {
  name: 'Monitor',
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
          top: '15%',
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
          // formatter: '{a0}: {c0}(mg/L) <br />{a1}: {c1} (ph)'
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
            },
            formatter: function(value, index) {
              let str = '';
              str = value.substring(0, 10) + '\n' + value.substring(11, 19);
              return str;
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
        yAxis: [
          {
            type: 'value',
            name: 'mg/L',
            nameTextStyle: {
              color: '#ffffff'
            },
            min: 0,
            max: 300,
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
          },
          {
            type: 'value',
            name: '℃',
            nameTextStyle: {
              color: '#ffffff'
            },
            position: 'right',
            max: 50,
            splitNumber: 8,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#354F60',
                width: 1
              }
            },
            axisTick: {
              show: false
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
        ],

        series: [
          {
            name: itmeName[0],
            type: 'line',
            yAxisIndex: 0, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true,
            symbol: 'none',
            smoothMonotone: 'x',
            itemStyle: {
              color: '#00F9A7'
            },
            data: data.options[1].values
          }, {
            name: itmeName[1],
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            symbol: 'none',
            smoothMonotone: 'x',
            itemStyle: {
              color: '#FFFF00'
            },
            data: data.options[0].values
          }
        ]
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
