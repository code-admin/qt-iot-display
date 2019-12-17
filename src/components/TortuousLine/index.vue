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
  name: 'TortuousLine',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {};
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
        legend: {
          data: ['温度', 'COD', 'DO浓度'],
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: [
          {
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
            data: ['2019-11-23 08:31:50', '2019-11-24 08:31:50', '2019-11-25 08:31:50', '2019-11-26 08:31:50', '2019-11-27 08:31:50',
              '2019-11-28 08:31:50', '2019-11-29 08:31:50', '2019-11-30 08:31:50', '2019-12-01 08:31:50', '2019-12-02 08:31:50']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '温度',
            max: 80,
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
            name: 'COD',
            gridIndex: 0,
            min: 100,
            max: 300,
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
              formatter: '{value} mg/L'
            }
          },
          {
            type: 'value',
            name: 'DO浓度',
            offset: 80,
            min: 100,
            max: 300,
            splitNumber: 8,
            nameTextStyle: {
              color: '#00D5FF'
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
                color: '#00D5FF',
                width: 1
              }
            },
            axisLabel: {
              show: true,
              formatter: '{value} mg/L'
            }
          }
        ],
        series: [
          {
            name: '温度',
            type: 'line',
            itemStyle: {
              color: '#FFFF00'
            },
            data: [22, 35, 19, 27, 30, 33, 31, 29, 26, 28]
          },
          {
            name: 'COD',
            type: 'line',
            gridIndex: 0,
            itemStyle: {
              color: '#00FFAA'
            },
            data: [270, 260, 280, 250, 270, 290, 260, 280, 290, 270]
          },
          {
            name: 'DO浓度',
            type: 'line',
            itemStyle: {
              color: '#00D5FF'
            },
            data: [150, 160, 150, 140, 130, 150, 160, 180, 170, 150]
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
