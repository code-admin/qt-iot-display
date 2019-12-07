<template>
  <div class="content">
    <div class="echart">
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceAlarm',
  data() {
    return {
      options: {
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
          },
          formatter: '{a0}: {c0}(mg/L) <br />{a1}: {c1} (ph)'
        },
        legend: {
          data: ['COD氨氮', 'PH酸碱度'],
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          type: 'category',
          data: ['28/11', '29/11', '30/11', '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'],
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
          name: 'mg/L',
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
        }, {
          type: 'value',
          gridIndex: 0,
          min: 0,
          max: 14,
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
        }],
        series: [{
          name: 'COD氨氮',
          type: 'line',
          smooth: true,
          symbol: 'none',
          smoothMonotone: 'x',
          itemStyle: {
            color: '#F78F74'
          },
          data: [180, 165, 189.99, 150.12, 163.32, 169.21, 171.28, 165.78, 181.21, 179.21]
        }, {
          name: 'PH酸碱度',
          type: 'line',
          yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true,
          symbol: 'none',
          smoothMonotone: 'x',
          itemStyle: {
            color: '#66FFFF'
          },
          data: [5, 7, 6.99, 8.55, 11.32, 5.21, 6.28, 7.98, 9.21, 11.21]
        }]
      }
    };
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
