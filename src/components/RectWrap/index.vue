<template>
  <div class="rectWrap">
    <div class="horn">
      <div class="lt" />
      <div class="rt" />
      <div class="rb" />
      <div class="lb" />
    </div>
    <div class="slot-content">
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie';
export default {
  name: 'RectWrap',
  props: {
    title: {
      type: String,
      default: '设备数'
    },
    color: {
      type: String,
      default: '#00FFD5'
    },
    unit: {
      type: String,
      default: '台'
    },
    value: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 100
    }
  },
  computed: {
    options() {
      const total = (this.total < this.value) ? this.value : this.total;
      const rest = {
        name: 'rest',
        label: { show: false },
        value: total - this.value,
        itemStyle: { opacity: 0.1, shadowBlur: 0 }
      };
      const doughnutData = [rest, { name: this.title || '', value: this.value || 0, itemStyle: { opacity: 1 }}];
      const options = {
        series: [
          {
            type: 'pie',
            name: this.title,
            clockwise: true,
            radius: ['76%', '87%'],
            label: {
              normal: {
                show: true,
                position: 'center',
                fontSize: 18,
                lineHeight: 18,
                formatter: `{title|{b}}\n{number|{c}}\n{unit|${this.unit}}`,
                rich: {
                  title: { color: 'white', fontSize: 18, fontWeight: 'bold', lineHeight: 20 },
                  number: { color: this.color, fontSize: 36, lineHeight: 60, verticalAlign: 'middle' },
                  unit: { color: 'white', fontSize: 20, lineHeight: 15 }
                }
              }
            },
            itemStyle: {
              shadowColor: this.color,
              shadowBlur: 6,
              opacity: 1
            },
            color: [this.color],
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
.rectWrap {
  width: 214px;
  height: 214px;
  position: relative;
  display: inline-block;
  background-color: #031d2e79;
  .horn {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border: 1px double #476479;
    > div {
      width: 15px;
      height: 15px;
      position: absolute;
    }
    .lt {
      border-top: 2px solid #00FFFF;
      border-left: 2px solid #00FFFF;
      left: -2px;
      top: -2px;
    }
    .rt {
      border-top: 2px solid #00FFFF;
      border-right: 2px solid #00FFFF;
      right: -2px;
      top: -2px;
    }
    .rb {
      border-bottom: 2px solid #00FFFF;
      border-right: 2px solid #00FFFF;
      right: -2px;
      bottom: -2px;
    }
    .lb {
      border-bottom: 2px solid #00FFFF;
      border-left: 2px solid #00FFFF;
      left: -2px;
      bottom: -2px;
    }
  }
  .slot-content {
    height: 100%;
    width: 100%;
  }

}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
