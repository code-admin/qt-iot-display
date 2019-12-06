<template>
  <div class="content">
    <div class="echart">
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  name: 'AlarmTotal',
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(data) {
            var result = data[1].axisValueLabel + '告警总量: ' + data[1].value + '次';
            return result;
          }
        },
        grid: {
          left: '1',
          right: '1',
          top: '10%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'],
          axisTick: {
            alignWithLabel: true
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
        yAxis: [{
          type: 'value',
          splitLine: {
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
        series: [{ // For shadow
          type: 'bar',
          barWidth: 25, // 宽度
          itemStyle: {
            normal: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: [120, 120, 120, 120, 120, 120, 120],
          animation: false
        },
        {
          type: 'bar',
          barWidth: 25, // 宽度
          label: {
            normal: {
              show: true,
              position: 'top',
              distance: 12,
              formatter: function(params) {
                return params.data.value;
              },
              textStyle: {
                color: '#ffffff',
                fontSize: 12
              }
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#F78F74'
              }, {
                offset: 1,
                color: '#F46276'
              }])

            }

          },
          data: [45, 79, 95, 39, 58, 68, 62]
        }
        ]
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
        // background-color: #3739472d;
    }

}

.echarts {
    width: 100%;
    height: 100%;
}
</style>
