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
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    options() {
      const data = this.data;
      const options = {
        grid: {
          top: 18,
          left: 30,
          width: '95%',
          height: '80%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          axisLabel: {
            color: '#fff'
          },
          axisLine: { lineStyle: { color: '#ffffff4d' }},
          data: data.map(d => d.name || '')
        },
        axisLine: {
          lineStyle: { width: 20 }
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLabel: { color: '#fff' },
          axisLine: { lineStyle: { color: '#ffffff4d' }}
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: data,
            symbol: 'circle',
            symbolSize: 0.1,
            smoothMonotone: 'x',
            hoverAnimation: false,
            label: { show: true, color: '#fff' },
            itemStyle: { color: '#FF99AA' },
            areaStyle: {
              color: {
                type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#FF99AA22'
                }, {
                  offset: 0.95,
                  color: '#FF99AA22'
                }]
              }
            }
          },
          {
            type: 'bar',
            barMaxWidth: 18,
            data: data,
            itemStyle: {
              barBorderRadius: 14,
              color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#4FEBC6' }, { offset: 1, color: '#28C9D3' }] }
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
  height: 215px;
  display: flex;

  .echart{
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
