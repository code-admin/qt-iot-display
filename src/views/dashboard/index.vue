<template>
  <div class="dashboard-container">
    <BoxWrap class="clazz01" subtext="设备告警" :select-list="['常规井','雨水井','污水井']" :change="callChange">
      <RadarPart :data="radarData" />
    </BoxWrap>

    <BoxWrap class="clazz02" title="设备" subtext="告警信息">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="180" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </BoxWrap>

    <BoxWrap class="clazz03" title="设备类型" subtext="占比情况">
      <Doughnut :data="doughnutData" indicator />
    </BoxWrap>

    <BoxWrap class="clazz04" :select-list="['常规井','雨水井','污水井']" subtext="日告警趋势">
      <AlarmTrend :data="alarmTrend" />
    </BoxWrap>

    <BoxWrap class="clazz05" title="污水井" subtext="水位变化">
      <WaterLevel :data="waterChange" />
    </BoxWrap>

    <BoxWrap class="clazz06" title="污水井" subtext="水质参数">
      <waveform :data="waveformData" />
    </BoxWrap>

    <div class="rect-container">
      <RectWrap title="设备总数" :value="total.totalDevices || 0" color="#66B3FF" />
      <RectWrap title="在线设备数" :value="total.onlineDevices || 0" />
      <RectWrap title="告警设备数" :value="total.warningDevices || 0" color="#FFBF7F" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BoxWrap from '@/components/BoxWrap';
import RadarPart from '@/components/RadarPart';
import Doughnut from '@/components/Doughnut';
import AlarmTrend from './AlarmTrend';
import Waveform from '@/components/Waveform';
import WaterLevel from '@/components/WaterLevel';
import RectWrap from '@/components/RectWrap';
import 'echarts/lib/component/tooltip';

import { getTotalDevices } from '@/api/dashboard';

export default {
  name: 'Dashboard',
  components: {
    BoxWrap,
    RadarPart,
    Doughnut,
    AlarmTrend,
    Waveform,
    WaterLevel,
    RectWrap
  },
  data() {
    return {
      radarData: [],
      doughnutData: [],
      waterChange: [],
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
      ],
      total: null
    };
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.radarData = [
      { name: '水位高度', max: 100, label: '水位告警比例', value: Math.random() * 100, unit: '%' },
      { name: '电量', max: 100, label: '倾斜告警比例', value: Math.random() * 100, unit: '%' },
      { name: '溢满', max: 100, label: '溢满告警比例', value: Math.random() * 100, unit: '%' },
      { name: '设备倾斜', max: 100, label: '电量低告警比例', value: Math.random() * 100, unit: '%' }
    ];
    this.doughnutData = [
      { name: '污水井', value: 36 }, { name: '常规井', value: 36 }, { name: '雨水井', value: 28 }
    ];
    this.alarmTrend = [
      { name: '11/02', value: 45 },
      { name: '11/03', value: 79 },
      { name: '11/04', value: 95 },
      { name: '11/05', value: 39 },
      { name: '11/06', value: 58 },
      { name: '11/07', value: 68 },
      { name: '11/08', value: 62 }
    ];
    this.waterChange = [
      { name: '井08', typeName: '离线', value: 0.7, type: 'offline' },
      { name: '井09', typeName: '告警', value: 0.5, type: 'warn' },
      { name: '井10', typeName: '正常', value: 0.92, type: 'normal' },
      { name: '井11', typeName: '离线', value: 0.85, type: 'offline' },
      { name: '井12', typeName: '故障', value: 1.1, type: 'fault' }
    ];
    this.waveformData = {
      reportTime: ['28/11', '29/11', '30/11', '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'],
      options: [
        { name: 'COD氨氮', values: [180, 165, 189.99, 150.12, 163.32, 169.21, 171.28, 165.78, 181.21, 179.21] },
        { name: 'PH酸碱度', values: [5, 7, 6.99, 8.55, 11.32, 5.21, 6.28, 7.98, 9.21, 11.21] }
      ]
    };
  },
  mounted() {
    this.getDeviceNumber();
  },
  methods: {
    // 获取设备数量&天气数据
    getDeviceNumber() {
      console.log(11111111111111111111111111);
      getTotalDevices({}).then(res => {
        if (res.code === 10000) {
          this.total = res.data;
        }
      });
    },
    callChange(e) {
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
  // background-color: #3739472d;
}
</style>
