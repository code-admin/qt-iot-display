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
          left: '1%',
          right: '2%',
          top: '10%',
          bottom: '2%',
          containLabel: true
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
          axisLine: {
            lineStyle: {
              color: '#355061',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
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
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff',
              fontFamily: 'Microsoft YaHei',
              fontSize: 13
            }
          }
        },
        series: [{
          type: 'line',
          smooth: true,
          symbol: 'none',
          smoothMonotone: 'x',
          itemStyle: { color: '#66FFFF' },
          data: [180, 165, 189.99, 150.12, 163.32, 169.21, 171.28, 165.78, 181.21, 179.21]
        }, {
          type: 'line',
          smooth: true,
          symbol: 'none',
          smoothMonotone: 'x',
          itemStyle: { color: '#F78F74' },
          data: [120, 155, 179.99, 187.55, 203.32, 179.21, 142.28, 246.98, 191.21, 210.21]
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
