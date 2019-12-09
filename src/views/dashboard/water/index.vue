<template>
  <div class="dashboard-container">
    <box-wrap class="clazz01" title="污水井" subtext="告警变化趋势">
      <trend :data="trendData" />
    </box-wrap>
    <box-wrap class="clazz02" title="雨水井" subtext="水位变化趋势" />
    <box-wrap class="clazz03" title="雨水井" subtext="水质状况" />

    <box-wrap class="clazz04" title="雨水井" subtext="水质参数">
      <waveform :data="waveformData" />
    </box-wrap>
    <box-wrap class="clazz05" title="雨污水井" subtext="告警信息">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="150" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="110" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </box-wrap>
    <box-wrap class="clazz06" title="污水井" subtext="设备告警">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="150" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="110" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </box-wrap>
  </div>
</template>

<script>
import BoxWrap from '@/components/BoxWrap';
import trend from './Trend';
import Waveform from '@/components/Waveform';
export default {
  components: {
    BoxWrap,
    trend,
    Waveform
  },
  data() {
    return {
      trendData: {},
      tableData: [],
      waveformData: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.trendData = {
        reportTime: ['28/11', '29/11', '30/11', '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'],
        options: [
          { name: '雨水井告警次数', values: [5, 8, 4, 11, 15, 16, 9, 6, 13, 8] },
          { name: '污水井告警次数', values: [7, 16, 10, 15, 19, 4, 7, 8, 13, 14] }
        ]
      };
      this.tableData = [
        { date: '2019/11/07 12:05:08', name: '井盖', type: '水位过高', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2019/11/06 02:24:12', name: '井盖34', type: 'COD浓度过高', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2019/11/04 19:02:38', name: '井盖25', type: 'PH酸碱度过高', address: '上海市普陀区金沙江路 1519 弄' },
        { date: '2019/10/01 13:51:52', name: '井盖36', type: '设备溢满', address: '上海市普陀区金沙江路 1516 弄' }
      ];
      this.waveformData = {
        reportTime: ['28/11', '29/11', '30/11', '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'],
        options: [
          { name: 'COD氨氮', values: [180, 165, 189.99, 150.12, 163.32, 169.21, 171.28, 165.78, 181.21, 179.21] },
          { name: 'PH酸碱度', values: [5, 7, 6.99, 8.55, 11.32, 5.21, 6.28, 7.98, 9.21, 11.21] }
        ]
      };
    }

  }
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
        position: relative;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.clazz01 {
    left: 10px;
}

.clazz02 {
    right: 10px;

    .top3 {
        font-size: 16px;
        font-family: DINPro;
        font-weight: bold;
        font-style: italic;
        color: rgba(204, 82, 82, 1);
    }
}

.clazz03 {
    top: 450px;
    left: 10px;
}

.clazz04 {
    right: 10px;
    top: 450px;
}

.clazz05 {
    top: 750px;
    left: 10px;
}

.clazz06 {
    right: 10px;
    top: 750px;
}

.rect-container {
  top: 790px;
  left: 50%;
  height: 214px;
  display: flex;
  margin: 0 auto;
  min-width: 695px;
  position: absolute;
  transform: translateX(-50%);
  justify-content: space-around;
}
</style>
