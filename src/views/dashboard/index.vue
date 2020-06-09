<template>
  <div class="dashboard-container">
    <BoxWrap class="clazz01" subtext="设备告警" :select-list="['常规井','雨水井','污水井']" :change="getAlarmByDeviceModel">
      <RadarPart v-if="!!radarData" :data="radarData" />
    </BoxWrap>

    <BoxWrap class="clazz02" title="设备" subtext="告警信息">
      <el-table class="wrap-table scroll-content" :data="tableData">
        <el-table-column prop="createTime" label="时间" width="160" />
        <el-table-column prop="deviceName" label="设备名称" class-name="cell-primary" width="150" show-overflow-tooltip />
        <el-table-column prop="alarmName" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </BoxWrap>

    <BoxWrap class="clazz03" title="设备类型" subtext="占比情况">
      <Doughnut :data="doughnutData" indicator />
    </BoxWrap>

    <BoxWrap class="clazz04" :select-list="['常规井','雨水井','污水井']" :change="getDailyAlarm" subtext="日告警趋势">
      <AlarmTrend :data="alarmTrend" />
    </BoxWrap>

    <BoxWrap class="clazz05" title="实时" subtext="水位变化">
      <el-select v-model="projectId" class="project-select" size="mini" placeholder="请选择" @change="getWaterLevelList">
        <el-option v-for="project in projectList" :key="project.id" :label="project.projectName" :value="project.id" />
      </el-select>
      <WaterLevel :data="waterChange" />
    </BoxWrap>

    <BoxWrap class="clazz06" title="污水井" subtext="水质参数">
      <waveform :data="waveformData" />
    </BoxWrap>

    <div class="rect-container">
      <RectWrap title="设备总数" :value="totals.totalDevices || 0" color="#66B3FF" :total="totals.totalDevices" />
      <RectWrap title="在线设备数" :value="totals.onlineDevices || 0" :total="totals.totalDevices" />
      <RectWrap title="告警设备数" :value="totals.warningDevices || 0" color="#FFBF7F" :total="totals.totalDevices" />
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

import { dailyAlarm, getAlarm, getTotalDevices, getDeviceModels, getAlarmList, getWaterLevel, waterQuality } from '@/api/dashboard';
import { getProjectList } from '@/api/common';

import { scrollData } from '@/utils/animation';

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
      radarData: null,
      doughnutData: [],
      waterChange: [],
      tableData: [],
      totals: {
        totalDevices: null,
        onlineDevices: null,
        warningDevices: null,
        weather: null
      },
      projectId: null,
      projectList: []
    };
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.radarData = null;
    this.doughnutData = [];
    this.alarmTrend = [];
    this.waterChange = [];
    this.waveformData = {
      reportTime: [],
      options: [
        { name: 'COD氨氮', values: [] },
        { name: 'PH酸碱度', values: [] }
      ]
    };
  },
  mounted() {
    this.getDeviceNumber(); // 底部中央各数据
    this.getAlarmByDeviceModel(0); // 图一 雷达图数据
    this.getAlarms(); // 图二 告警列表
    this.getDeviceType(); // 图三 设备类型占比
    this.getDailyAlarm(0); // 图四 日告警趋势
    this.getWaterLevelList(); // 图五 水位
    this.getWaterPros(); // 图六 水质参数

    this.getProjects();
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    // 获取告警列表
    getAlarms() {
      getAlarmList({ pageIndex: 1, pageSize: 10 }).then(res => {
        if (res.code === 10000) {
          this.tableData = res.data;
          this.timer = setInterval(() => scrollData('.scroll-content', this.tableData), 4000);
        }
      });
    },
    // 雷达图数据
    getAlarmByDeviceModel(model) {
      getAlarm(model).then(res => {
        this.radarData = [
          { name: '水位高度', max: res.data.total, label: '水位告警比例', value: res.data.waterLevel, unit: '%' },
          { name: '电量', max: res.data.total, label: '倾斜告警比例', value: res.data.isTit, unit: '%' },
          { name: '溢满', max: res.data.total, label: '溢满告警比例', value: res.data.overflow, unit: '%' },
          { name: '设备倾斜', max: res.data.total, label: '电量低告警比例', value: res.data.lowBattery, unit: '%' },
          { name: '设备离线', max: res.data.total, label: '设备离线比例', value: res.data.offline, unit: '%' }
        ];
      });
    },
    // 获取设备总数、在线数、告警数、以及天气参数
    getDeviceNumber() {
      getTotalDevices({}).then(res => {
        this.totals = res.data;
      });
    },
    // 设备告警趋势
    getDailyAlarm(i) {
      dailyAlarm(i).then(res => {
        this.alarmTrend = res.data;
      });
    },

    // 获取设备占比情况
    getDeviceType() {
      getDeviceModels().then(res => {
        this.doughnutData = [
          { name: '常规井', value: res.data.normalWell },
          { name: '雨水井', value: res.data.sewageWell },
          { name: '污水井', value: res.data.rainWell }
        ];
      });
    },
    // 实时水位变化
    getWaterLevelList(projectId) {
      getWaterLevel({ projectId: projectId }).then(res => {
        this.waterChange = res.data;
      });
    },
    // 获取水质参数
    getWaterPros() {
      waterQuality().then(res => {
        if (res.code === 10000) {
          this.waveformData = {
            reportTime: res.data.times,
            options: [
              { name: 'COD氨氮', values: res.data.cod },
              { name: 'PH酸碱度', values: res.data.ph }
            ]
          };
        }
      });
    },

    // 获取项目
    getProjects() {
      getProjectList().then(res => {
        this.projectList = res.data;
      });
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
  .project-select{
    width: 200px;
  }
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
