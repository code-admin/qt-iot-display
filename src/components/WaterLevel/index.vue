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
import 'echarts/lib/component/markPoint';
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      scrollData: []
    };
  },
  computed: {
    options() {
      const data = this.scrollData;
      const maxValue = Math.max(...data.map(d => d.value || 0));
      const barData = data.map(d => {
        return { ...d, value: Math.ceil(maxValue) };
      });
      const colorMap = {
        offline: [{ offset: 0, color: 'rgba(255, 255, 255, 0.46)' }, { offset: 0.9, color: 'rgba(255, 255, 255, 0)' }],
        warn: [{ offset: 0, color: 'rgba(255, 243, 104, 0.38)' }, { offset: 0.9, color: 'rgba(255, 243, 104, 0)' }],
        normal: [{ offset: 0, color: 'rgba(0, 255, 170, 0.4)' }, { offset: 0.9, color: 'rgba(0, 255, 170, 0)' }],
        fault: [{ offset: 0, color: 'rgba(255, 127, 102, 0.54)' }, { offset: 0.9, color: 'rgba(255, 127, 102, 0)' }]
      };
      const textColorMap = { offline: 'rgb(255, 255, 255)', warn: 'rgb(255, 243, 104)', normal: 'rgb(0, 255, 170)', fault: 'rgb(255, 127, 102)' };
      const options = {
        grid: {
          top: '25%',
          left: 30,
          width: '95%',
          height: '50%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter: '{b0}<br /> 水距 :{c0} (cm)'
        },
        xAxis: {
          axisLabel: {
            color: '#fff',
            fontWeight: 'bold'
          },
          axisTick: { show: false },
          axisLine: { show: false },
          data: data.map(d => {
            return { value: d.typeName || '', textStyle: { color: textColorMap[d.type] }};
          })
        },
        yAxis: {
          type: 'value',
          inverse: true,
          max: Math.ceil(maxValue),
          splitLine: { show: true, lineStyle: { color: '#00FFFF', type: 'dotted', opacity: 0.3 }},
          axisLabel: { color: '#fff' },
          axisLine: { lineStyle: { color: '#ffffff4d' }}
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: data,
            symbol: 'circle',
            symbolSize: 0.01,
            showSymbol: true,
            smoothMonotone: 'x',
            label: { show: true, formatter: '{c}cm', color: '#ffffff' },
            itemStyle: { color: '#00FFFF' }
          },
          {
            type: 'bar',
            data: barData.map(bar => {
              return { value: bar.value + '', itemStyle: {
                color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: colorMap[bar.type] }
              }};
            }),
            markPoint: {
              symbol: 'circle',
              data: barData.map((bar, i) => {
                return {
                  coord: [i, 0],
                  symbolSize: [78, 32],
                  itemStyle: {
                    color: { type: 'radial', x: 0.5, y: 0.5, r: 2, colorStops: colorMap[bar.type] }
                  },
                  label: {
                    show: true,
                    color: 'white',
                    fontSize: 13,
                    offset: [0, -30],
                    formatter: bar.name.substring(0, 5) + '\n' + bar.name.substring(5, 10)
                  }
                };
              })
            }
          }
        ]
      };
      return options;
    }
  },
  watch: {
    data: {
      handler: function(data) {
        let count = 5;
        const maxCount = data.length - 1;
        this.scrollData = data.length > 5 ? data.slice(0, 5) : data;
        if (data.length <= 5) {
          this.timer && clearInterval(this.timer);
          return;
        }

        const scrollData = this.scrollData;
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => {
          scrollData.shift();
          const index = count + 1 > maxCount ? (count = 0) : count++;
          if (data[index].value == null) {
            data[index].value = 0;
          }
          scrollData.push(data[index]);
          this.scrollData = scrollData;
        }, 3500);
      },
      immediate: true
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
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
