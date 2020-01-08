<template>
  <div class="radar-content">
    <div class="radar-echart">
      <v-chart :options="options" />
    </div>
    <div class="information">
      <div v-for="item in dataInfo" :key="item.label" class="line">
        <label>{{ item.label }}</label>
        <div class="font-box"><font>{{ item.value }}</font></div>
        <span>{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/radar';
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
      let data = this.data;
      const length = this.data.length;
      if (length > 5) data = data.slice(0, 5);
      const indicator = data.map(d => {
        return { name: d.name || '', max: (d.max || 100) };
      });
      const options = {
        radar: {
          nameGap: 8,
          name: { textStyle: { color: '#fff', padding: [0, 0] }},
          splitNumber: 4,
          splitArea: {
            areaStyle: {
              color: ['rgba(117, 175, 115, 0.8)', 'rgba(117, 175, 115, 0.6)', 'rgba(117, 175, 115, 0.4)', 'rgba(117, 175, 115, 0.2)']
            }
          },
          axisLine: {
            lineStyle: { color: 'rgba(255, 255, 255, 0.2)' }
          },
          splitLine: {
            lineStyle: { color: 'rgba(255, 255, 255, 0.4)' }
          },
          indicator: indicator
        },
        series: [
          {
            type: 'radar',
            itemStyle: { opacity: 0 },
            lineStyle: { color: '#fff368', shadowColor: 'rgba(255, 243, 104, 0.8)', shadowBlur: 8 },
            data: [{ value: data.map(d => d.value || 0) }]
          }
        ]
      };
      return options;
    },
    dataInfo() {
      return this.data.map(d => {
        return { label: d.label || '', value: (d.value / d.max * 100).toFixed(2) || 0, unit: d.unit || '%' };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.radar-content {
  height: 215px;
  display: flex;

  .radar-echart{
    width: 280px;
  }

  .information {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    // background-color: #3739478f;
    justify-content: space-around;
    align-items: flex-end;
    padding-right: 15px;

    .line {
      white-space: nowrap;

      label {
        width:60px;
        height:12px;
        font-size:14px;
        font-weight:bold;
        font-family:Microsoft YaHei;
        color:rgba(255,243,104,1);
        line-height:50px;
      }

      .font-box {
        width: 100px;
        height: 30px;
        margin: 0 5px;
        display: inline-block;
        background:rgba(25,127,166,.5);
        border:1px solid rgba(0,219,219,.5);
        text-align: center;
        font {
            width:24px;
            height: 17px;
            font-size:24px;
            color:white;
            font-weight:400;
            letter-spacing: 2px;
            font-family:UniDreamLED;
        }
      }
      span {
        width:14px;
        height:12px;
        font-size: 14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:50px;
      }
    }
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
