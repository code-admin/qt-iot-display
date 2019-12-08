<template>
  <div class="doughnut-content">
    <div class="doughnut-echart">
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    indicator: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    options() {
      const data = this.data;
      const doughnutData = data.map(d => {
        return { name: d.name || '', value: (d.value || 0) };
      });
      const left = doughnutData.length > 5 ? '25%' : '35%';
      const options = {
        legend: {
          show: true,
          y: 'center',
          right: 40,
          itemGap: 30,
          orient: 'vertical',
          textStyle: { color: '#fff', fontSize: 14 },
          data: data.map(d => d.name || '')
        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '70%'],
            center: [left, '50%'],
            label: {
              normal: {
                show: this.indicator,
                fontSize: 14,
                lineHeight: 18,
                formatter: '{b}{white|设备\n}{hr|}\n{white|占比{d}%}',
                rich: {
                  white: { color: 'white', fontSize: 14 },
                  hr: { width: '100%', height: 1, lineHeight: 8, backgroundColor: '#ffffff4d' }
                }
              }
            },
            labelLine: {
              normal: { show: true, lineStyle: { color: '#fff', opacity: 0.3 }}
            },
            color: ['#35E8BE', '#638CFE', '#E88774', '#D0BB67', '#47B165', '#CC8FFC', '#8CF17E', '#6A67FC', '#68BBFC', '#bdbdbd'],
            data: doughnutData
          }
        ]
      };
      return options;
    }
  }
};
</script>

<style lang="scss" scoped>
.doughnut-content {
  height: 215px;
  display: flex;

  .doughnut-echart{
    width: 100%;
    // background-color: #3739472d;
  }

}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
