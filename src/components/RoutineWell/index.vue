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
  name: 'RoutineWell',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  computed: {
    options() {
      const options = {
        grid: {
          left: '2%',
          right: '2%',
          top: '12%',
          bottom: '1%',
          containLabel: true
        },
        // legend: {
        //   data: ['温度', 'COD', 'DO浓度'],
        //   textStyle: {
        //     color: '#ffffff'
        //   }
        // },
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
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(128,128,128, 0.75)'
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              let str = '';
              str = value.substring(0, 10) + '\n' + value.substring(11, 19);
              return str;
            },
            textStyle: {
              width: '50px',
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei',
              fontSize: 13
            }
          },
          data: this.data.updateTime
        }],
        yAxis: [{
          type: 'value',
          name: '温度',
          // max: 80,
          splitNumber: 8,
          nameTextStyle: {
            color: '#FFFF00'
          },
          position: 'left',
          splitLine: { // 分割线
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          axisLine: { // 坐标轴线
            lineStyle: {
              color: '#FFFF00',
              width: 1
            }
          },
          axisLabel: {
            show: true,
            formatter: '{value} °C'
          }
        },
        {
          type: 'value',
          name: '水位',
          // min: 100,
          // max: 300,
          splitNumber: 8,
          nameTextStyle: {
            color: '#00FFAA'
          },
          position: 'right',
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#00FFAA',
              width: 1
            }
          },
          axisLabel: {
            show: true,
            formatter: '{value} cm'
          }
        }
        ],
        series: [{
          name: '温度',
          yAxisIndex: 0,
          type: 'line',
          label: {
            show: true,
            formatter: '{@score}℃'
          },
          itemStyle: {
            color: '#FFFF00'
          },
          data: this.data.enTemperature
        },
        {
          name: '水位',
          yAxisIndex: 1,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          label: {
            show: true,
            formatter: '{@score}cm'
          },
          itemStyle: {
            color: '#00FFAA'
          },
          data: this.data.waterLevel,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(169,169,169,.5)'
              },
              {
                offset: 0.95,
                color: 'rgba(169,169,169,.03)'
              }
              ]
            }
          }
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
    height: 270px;
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
