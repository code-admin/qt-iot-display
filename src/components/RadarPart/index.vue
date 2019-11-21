<template>
  <div class="page-content">
    <v-chart :options="options" />
  </div>
</template>

<script>
import 'echarts/lib/chart/radar';
export default {
  data() {
    return {
      options: {
        radar: {
          nameGap: 8,
          name: {
            textStyle: {
              color: '#fff',
              padding: [0, 0]
            }
          },
          splitNumber: 4,
          splitArea: {
            areaStyle: {
              color: [
                'rgba(117, 175, 115, 0.8)',
                'rgba(117, 175, 115, 0.6)',
                'rgba(117, 175, 115, 0.4)',
                'rgba(117, 175, 115, 0.2)'
              ]
            }
          },
          axisLine: {
            lineStyle: { color: 'rgba(255, 255, 255, 0.2)' }
          },
          splitLine: {
            lineStyle: { color: 'rgba(255, 255, 255, 0.4)' }
          },
          indicator: [
            { name: '水位高度', max: 100 },
            { name: '电量', max: 100 },
            { name: '溢满', max: 100 },
            { name: '设备倾斜', max: 100 }
          ]
        },
        series: [
          {
            type: 'radar',
            itemStyle: { opacity: 0 },
            lineStyle: {
              color: '#fff368',
              shadowColor: 'rgba(255, 243, 104, 0.8)',
              shadowBlur: 8
            },
            data: [
              {
                value: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ],
                name: '预算分配（Allocated Budget）'
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.page-content {
  width: 280px;
  height: 215px;
  // background-color: #3739478f;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
