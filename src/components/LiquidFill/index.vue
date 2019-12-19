<template>
  <div class="content">
    <div class="echart">
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
import 'echarts-liquidfill';
export default {
  name: 'LiquidFill',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    options() {
      var data = [];
      var value = this.data.value || Math.random();
      data.push(value);
      data.push(value);
      var options = {
        // backgroundColor: 'rgba(3, 27, 49, 1)',
        series: [{
          type: 'liquidFill',
          radius: '98%',
          data: data,
          outline: {
            show: false, // 是否显示轮廓 布尔值
            borderDistance: 10, // 外部轮廓与图表的距离 数字
            itemStyle: {
              borderColor: 'rgba(0, 255, 255, 1)', // 边框的颜色
              borderWidth: 2 // 边框的宽度
              // shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
              // shadowColor: '#000' //外部轮廓的阴影颜色
            }
          },
          backgroundStyle: {
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.1)'
          },
          itemStyle: {
            opacity: 0.8, // 波浪的透明度
            shadowBlur: 1, // 波浪的阴影范围
            shadowColor: 'red'// 阴影颜色
          },
          color: ['rgba(0, 255, 255, 0.54)'],
          shape: 'circle', // 水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
          amplitude: 7, // 振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
          label: {
            normal: {
              formatter: value.toFixed(2) + '%',
              textStyle: {
                fontSize: 20
              }
            }
          }
        }]
      };
      return options;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 142px;
  width: 142px;
  display: inline-flex;

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
</style>·1
