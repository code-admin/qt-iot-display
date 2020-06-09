<template>
  <div class="dashboard-container">
    <box-wrap class="clazz01" title="水质" subtext="参数变化">
      <waveform v-if="!!waveformData" :data="waveformData" />
    </box-wrap>
    <box-wrap class="clazz02" title="井盖" subtext="设备告警排行">
      <el-row :gutter="20" class="tied">
        <el-col :span="12">
          <el-table class="wrap-table" :data="top1">
            <el-table-column prop="index" label="名次">
              <template slot-scope="scope">
                <div :class="scope.row.index < 4 ? 'top3':''">
                  {{ scope.row.index }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="deviceName" label="设备名称" class-name="cell-primary" show-overflow-tooltip />
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table class="wrap-table" :data="top2">
            <el-table-column prop="index" label="名次" />
            <el-table-column prop="deviceName" label="设备名称" class-name="cell-primary" show-overflow-tooltip />
          </el-table>
        </el-col>
      </el-row>

    </box-wrap>
    <box-wrap class="clazz03" title="井盖" subtext="告警总数量">
      <alarm-total :data="warnData" />
    </box-wrap>
    <box-wrap class="clazz04" title="井盖" subtext="实时水位变化">
      <el-select v-model="projectId" class="project-select" size="mini" placeholder="请选择" @change="getWaterLevelList">
        <el-option v-for="project in projectList" :key="project.id" :label="project.projectName" :value="project.id" />
      </el-select>
      <water-level :data="waterChange" />
    </box-wrap>
    <box-wrap class="clazz05" title="井盖" subtext="告警信息">
      <el-table class="wrap-table scroll-content" :data="tableData">
        <el-table-column prop="createTime" label="时间" width="160" />
        <el-table-column prop="deviceName" label="设备名称" class-name="cell-primary" width="150" show-overflow-tooltip />
        <el-table-column prop="alarmName" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </box-wrap>
    <box-wrap class="clazz06" title="井盖" subtext="智能状态">
      <doughnut v-if="!!doughnutData" :data="doughnutData" />
    </box-wrap>

    <div class="rect-container">
      <RectWrap title="设备总数" :value="total.totalDevices || 0" color="#66B3FF" :total="total.totalDevices" />
      <RectWrap title="在线设备数" :value="total.onlineDevices || 0" :total="total.totalDevices" />
      <RectWrap title="告警设备数" :value="total.warningDevices || 0" color="#FFBF7F" :total="total.totalDevices" />
    </div>
  </div>
</template>

<script>
import BoxWrap from '@/components/BoxWrap';
import RectWrap from '@/components/RectWrap';
import AlarmTotal from '../charts/AlarmTotal';
import Doughnut from '@/components/Doughnut';
import Waveform from '@/components/Waveform';
import WaterLevel from '@/components/WaterLevel';
import { getTotalDevices, getWaterLevel, waterQuality, dailyAlarm } from '@/api/dashboard';
import { getWellCoverStatus, top10AlarmDevice } from '@/api/wellcover';
import { getAlarmList } from '@/api/water';
import { getProjectList } from '@/api/common';

import { scrollData } from '@/utils/animation';
export default {
  name: 'Wellcover',
  components: {
    BoxWrap,
    RectWrap,
    AlarmTotal,
    WaterLevel,
    Waveform,
    Doughnut
  },
  data() {
    return {
      waveformData: {
        reportTime: [],
        options: [
          { name: 'COD氨氮', values: [] },
          { name: 'PH酸碱度', values: [] }
        ]
      },
      tableData: [],
      top1: [],
      top2: [],
      warnData: [],
      waterChange: [],
      doughnutData: null,
      total: {
        totalDevices: null,
        onlineDevices: null,
        warningDevices: null,
        weather: null
      },
      projectId: null,
      projectList: []
    };
  },
  created() {
    this.initData();
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    initData() {
      this.getWaterPros(); // 水质参数
      this.getTop10(); //  图二, 告警排行
      this.getDailyAlarm(0); // 图三，井盖告警总理数
      this.getWaterLevelList();// 图四 水位变化
      this.getAlarms(); // 图5 告警列表
      this.getWellCoverWarningStatus(); // 图六 井盖状态
      this.getDeviceNumber(); // 底部数据

      this.getProjects();
    },

    // 获取告警排行
    getTop10() {
      var temp1 = [];
      var temp2 = [];
      top10AlarmDevice().then(res => {
        res.data.map((obj, index) => {
          if (index < 5) {
            temp1.push({
              index: index + 1,
              ...obj
            });
          }
          if (index > 4) {
            temp2.push({
              index: index + 1,
              ...obj
            });
          }
        });
      });
      this.top1 = temp1;
      this.top2 = temp2;
    },

    // 设备告警趋势
    getDailyAlarm(i) {
      const tempArr = [];
      dailyAlarm(i).then(res => {
        res.data && res.data.map(obj => {
          tempArr.push({
            time: obj.reportTime, value: obj.alarmNumber
          });
        });
        this.warnData = tempArr;
      });
    },

    // 实时水位变化
    getWaterLevelList(projectId) {
      getWaterLevel({ projectId: projectId }).then(res => {
        if (res.code === 10000) this.waterChange = res.data;
      });
    },
    // 获取设备数量&天气数据
    getDeviceNumber() {
      getTotalDevices({}).then(res => {
        if (res.code === 10000) {
          this.total = res.data;
        }
      });
    },
    // 获取告警列表
    getAlarms() {
      getAlarmList({ pageIndex: 1, pageSize: 10 }).then(res => {
        if (res.code === 10000) {
          this.tableData = res.data;
          this.timer = setInterval(() => scrollData('.scroll-content', this.tableData), 4000);
        }
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
    getWellCoverWarningStatus() {
      getWellCoverStatus().then(res => {
        const result = res.data;
        this.doughnutData = [{ name: '正常', value: result.normal }, { name: '未激活', value: result.inactive }, { name: '信号告警', value: result.signal }, { name: '电量告警', value: result.lowBattery }, { name: '亮度告警', value: result.brightness }, { name: '倾斜', value: result.isTit }, { name: '水位告警', value: result.waterLevel }, { name: '离线', value: result.offline }, { name: '溢满', value: result.overflow }, { name: '烟雾告警', value: result.smoke }];
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
.square-box1{
  left: 587px;
  top: 790px;
}
.square-box2{
  left: 823px;
  top: 790px;
}
.square-box3{
  left: 1058px;
  top: 790px;
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

.tied /deep/ .wrap-table.el-table{
    th,
    tr,
    td {
        padding: 6px 0;
    }
}
</style>
