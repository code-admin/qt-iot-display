<template>
  <div class="dashboard-container">
    <BoxWrap class="clazz01" subtext="设备告警" :select-list="['常规井','雨水井']" :change="callChange">
      <RadarPart :data="radarData" />
    </BoxWrap>

    <BoxWrap class="clazz02" title="井盖" subtext="告警信息">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="180" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </BoxWrap>

    <BoxWrap class="clazz03" title="雨水井" subtext="设备告警">
      <RadarPart :data="radarData" />
    </BoxWrap>

    <BoxWrap class="clazz04" title="雨水井" subtext="告警信息">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="180" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </BoxWrap>

    <BoxWrap class="clazz05" title="污水井" subtext="设备告警">
      <RadarPart :data="radarData" />
    </BoxWrap>

    <BoxWrap class="clazz06" title="污水井" subtext="告警信息">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="180" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </BoxWrap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BoxWrap from '@/components/BoxWrap';
import RadarPart from '@/components/RadarPart';

export default {
  name: 'Dashboard',
  components: {
    BoxWrap,
    RadarPart
  },
  data() {
    return {
      radarData: [
        { name: '水位高度', max: 100, label: '水位告警比例', value: Math.random() * 100, unit: '%' },
        { name: '电量', max: 100, label: '倾斜告警比例', value: Math.random() * 100, unit: '%' },
        { name: '溢满', max: 100, label: '溢满告警比例', value: Math.random() * 100, unit: '%' },
        { name: '设备倾斜', max: 100, label: '电量低告警比例', value: Math.random() * 100, unit: '%' }
      ],
      tableData: [
        {
          date: '2019/11/07 12:05:08',
          name: '井盖',
          type: '水位过高',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2019/11/06 02:24:12',
          name: '井盖34',
          type: '过度倾斜',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2019/11/04 19:02:38',
          name: '井盖25',
          type: '电量过低',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2019/10/01 13:51:52',
          name: '井盖36',
          type: '设备溢满',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    callChange(e) {
      console.log('in callChange....', e);
      const data = this.radarData.map(d => {
        return Object.assign(d, { value: Math.random() * 100 });
      });
      this.radarData = data;
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
</style>
