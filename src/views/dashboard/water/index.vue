<template>
  <div class="dashboard-container">
    <box-wrap class="clazz01" title="雨污" subtext="告警变化趋势">
      <trend :data="trendData" />
    </box-wrap>
    <box-wrap class="clazz02" title="污水监测" subtext="参数">
      <Monitor :data="codData" />
    </box-wrap>
    <box-wrap class="clazz03" title="雨污" subtext="告警状况">
      <RadarPart :data="radarData" />
    </box-wrap>
    <box-wrap class="clazz04" title="雨水监测" subtext="参数">
      <waveform :data="nhphData" />
    </box-wrap>
    <box-wrap class="clazz05" title="雨污" subtext="实时告警信息">
      <el-table class="wrap-table" :data="tableData" max-height="220px">
        <el-table-column prop="createTime" label="时间" width="160" />
        <el-table-column prop="deviceName" label="设备名称" class-name="cell-primary" width="150" show-overflow-tooltip />
        <el-table-column prop="alarmName" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </box-wrap>
    <box-wrap class="clazz06" title="实时" subtext="水位变化">
      <WaterLevel :data="waterChange" />
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
import Monitor from './Monitor';
import RectWrap from '@/components/RectWrap';
import RadarPart from '@/components/RadarPart';
import trend from './Trend';
import Waveform from '@/components/Waveform';
import WaterLevel from '@/components/WaterLevel';

import { getTotalDevices, getWaterLevel } from '@/api/dashboard';
import { getAlarmChange, getAlarmList, getPHList, getCodList, getAlarmPercentage } from '@/api/water';
export default {
  components: {
    BoxWrap,
    Monitor,
    RectWrap,
    trend,
    RadarPart,
    Waveform,
    WaterLevel
  },
  data() {
    return {
      trendData: {
        reportTime: [],
        options: [
          { name: '雨水井告警次数', values: [] },
          { name: '污水井告警次数', values: [] }
        ]
      },
      warnData: [],
      tableData: [],
      radarData: [
        { name: 'COD告警', max: 15, label: 'COD告警比例', value: 0, unit: '%' },
        { name: '氨氮告警', max: 15, label: '氨氮告警比例', value: 0, unit: '%' },
        { name: 'PH告警', max: 15, label: 'PH告警比例', value: 0, unit: '%' },
        { name: '水位告警', max: 15, label: '水位告警比例', value: 0, unit: '%' }
      ],
      codData: {
        reportTime: [],
        options: [
          { name: '温度', values: [] },
          { name: 'COD', values: [] }
        ]
      },
      nhphData: {
        reportTime: [],
        options: [
          { name: '氨氮', values: [] },
          { name: 'PH酸碱度', values: [] }
        ]
      },
      waterChange: [],
      total: {
        totalDevices: null,
        onlineDevices: null,
        warningDevices: null,
        weather: null
      }
    };
  },
  created() {
    this.nhphData = {
      reportTime: [],
      options: [
        { name: '氨氮', values: [] },
        { name: 'PH酸碱度', values: [] }
      ]
    };
  },
  mounted() {
    this.getStatusData();
    this.getChange();
    this.getDeviceNumber();
    this.getAlarms();
    this.getWaterLevelList();
    this.getCodData();
    this.getNHAandPH();
    setInterval(() => {
      this.getCodData();
      this.getNHAandPH();
    }, 60000);
  },
  methods: {
    // 设备状况
    getStatusData() {
      getAlarmPercentage({}).then(res => {
        if (res.code === 10000) {
          const total = res.data.cod + res.data.ammoniaNitrogen + res.data.ph + res.data.waterLevel;
          this.radarData = [
            { name: 'COD告警', max: total, label: 'COD告警比例', value: res.data.cod, unit: '%' },
            { name: '氨氮告警', max: total, label: '氨氮告警比例', value: res.data.ammoniaNitrogen, unit: '%' },
            { name: 'PH告警', max: total, label: 'PH告警比例', value: res.data.ph, unit: '%' },
            { name: '水位告警', max: total, label: '水位告警比例', value: res.data.waterLevel, unit: '%' }
          ];
        }
      });
    },
    // 变化趋势
    getChange() {
      getAlarmChange({}).then(res => {
        if (res.code === 10000) {
          this.trendData = {
            reportTime: res.data.reportTime,
            options: [
              { name: '雨水井告警次数', values: res.data.rainAlarmNumber },
              { name: '污水井告警次数', values: res.data.sewageAlarmNumber }
            ]
          };
        }
      });
    },

    // 获取温度&cod
    getCodData() {
      getCodList({}).then(res => {
        if (res.code === 10000) {
          this.codData = {
            reportTime: res.data.reportTime,
            options: [
              { name: '温度', values: res.data.temperature },
              { name: 'COD', values: res.data.codAlarmNumber }
            ]
          };
        }
      });
    },
    // 获取氨氮&PH
    getNHAandPH() {
      getPHList({}).then(res => {
        if (res.code === 10000) {
          this.nhphData = {
            reportTime: res.data.reportTime,
            options: [
              { name: '氨氮', values: res.data.nitrogenAlarmNumber },
              { name: 'PH酸碱度', values: res.data.phAlarmNumber }
            ]
          };
        }
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
          this.scrollData('.wrap-table', this.tableData);
        }
      });
    },
    scrollData: function(tableClass, tableData) {
      const selector = tableClass + ' .el-table__body-wrapper';
      const scrollElement = document.querySelectorAll(selector);
      if (scrollElement.length && tableData.length > 4) {
        const removeItem = tableData.splice(-1, 1);
        scrollElement[0].style.transition = 'all .8s';
        scrollElement[0].style.marginTop = '44px';

        setTimeout(() => {
          tableData.unshift(removeItem[0]);
          scrollElement[0].style.transition = 'all 0s ease 0s';
          scrollElement[0].style.marginTop = '0';
        }, 800);
        setTimeout(() => this.scrollData(tableClass, tableData), 4000);
      }
    },
    // 实时水位变化
    getWaterLevelList() {
      getWaterLevel({ projectId: null, pageIndex: 1, pageSize: 5 }).then(res => {
        if (res.code === 10000) this.waterChange = res.data;
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
