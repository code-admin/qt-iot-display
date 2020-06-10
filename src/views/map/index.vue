<template>
  <div class="amap-page-container">
    <el-amap
      ref="map"
      class="amap-box"
      vid="device-map-view"
      :amap-manager="amapManager"
      :events="events"
      :map-style="mapStyle"
      view-mode="2D"
      :center="mapCenter"
      :zoom="zoom"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="[marker.amapLongitude, marker.amapLatitude]"
        :events="{click: ()=>{handleMarker(marker)}}"
        :content="getContentByDeviceStatus(marker.deviceModel, marker.deviceStatus)"
        :vid="index"
        title="点击查看设备信息"
        :offset="[-14,-14]"
        :label="{ content: marker.deviceName, offset: [-30, -25] }"
      />
    </el-amap>

    <!-- 常规井窗口信息 -->
    <qt-dialog :visible.sync="dialogVisible1" :highlight-title="deviceName" title="井下参数信息">
      <div class="box-warp">
        <div class="liquid-container">
          <LiquidFill title="信号强度" :value="getStatusName(deviceLogsParams.signalStrength)" :percent="deviceLogsParams.signalStrength/31" :unit="`CSQ:${deviceLogsParams.signalStrength}`" />
          <LiquidFill title="电池电量" :value="`${(deviceLogsParams.battery/100).toFixed(2)} V`" :percent="1-(deviceLogsParams.powerConsumption/13000)" :unit=" `${(100-((deviceLogsParams.powerConsumption/13000)*100)).toFixed(2)} %`" color="rgba(120, 255, 100, 0.3)" />
          <LiquidFill title="光亮值" :value="deviceLogsParams.brightness === '0' ? '正常':'告警'" :percent="deviceLogsParams.brightness === '0' ? 0.1 : 0.8" color="rgba(255, 255, 255, 0.3)" />
          <LiquidFill title="倾斜角" :value="`< ${deviceLogsParams.isTilt}º`" :percent="deviceLogsParams.isTilt/90" />
          <LiquidFill title="烟雾浓度" :value="deviceLogsParams.smokeWarning === '0' ? '正常':'告警'" :percent="deviceLogsParams.smokeWarning === '0' ? 0.05 : 0.75" color="rgba(255, 255, 255, 0.3)" />
        </div>
        <div class="tortuous-container">
          <RoutineWell :data="RoutineWellData" />
        </div>
      </div>
    </qt-dialog>

    <!-- 雨污井窗口信息 -->
    <qt-dialog :visible.sync="dialogVisible2" :highlight-title="deviceName" title="水质参数信息">
      <div class="box-warp">
        <div class="liquid-container">
          <LiquidFill title="温度" value="28.7℃" :percent="0.65" color="rgba(120, 255, 100, 0.3)" />
          <LiquidFill title="COD" value="177.162" :percent="0.35" unit="mg/L" />
          <LiquidFill title="DO浓度" value="0.471" :percent="0.15" unit="mg/L" />
          <LiquidFill title="DO百分比" value="6.11%" :percent="0.17" />
          <LiquidFill title="PH值" value="7.72" :percent="0.52" />
          <LiquidFill title="氨氮值" value="0.43" :percent="0.12" unit="mg/L" color="rgba(255, 255, 255, 0.3)" />
        </div>
        <div class="tortuous-container">
          <TortuousLine :data="{}" />
        </div>
      </div>
    </qt-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { AMapManager } from 'vue-amap';
import LiquidFill from '@/components/LiquidFill';
import RoutineWell from '@/components/RoutineWell';
import TortuousLine from '@/components/TortuousLine';

import { getDeviceMap } from '@/api/dashboard';
import { getDeviceInfosById } from '@/api/wellcover';

const amapManager = new AMapManager();
export default {
  components: {
    LiquidFill,
    RoutineWell,
    TortuousLine
  },
  data() {
    return {
      isloading: false,
      dialogVisible1: false,
      dialogVisible2: false,
      amapManager,
      // 可以根据项目 经纬度来设置地图中心点
      mapCenter: [120.500439, 27.366849],
      zoom: 11,
      events: {
        init: o => {

        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          // alert('map clicked');
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0
      }],
      // 高德开发平台自定义样式
      mapStyle: 'amap://styles/4a9de36e3db3bd5097a179af47218776',
      markers: [],
      deviceModel: 0,
      deviceName: null,
      deviceLogsParams: {},
      RoutineWellData: {
        updateTime: [],
        waterLevel: [],
        enTemperature: []
      }
    };
  },
  computed: {
    getContentByDeviceStatus() {
      return function(deviceType, status) {
        // 0 未激活  1  正常  2告警   3.离线
        // 常规井
        if (deviceType === 1 && status === 0) {
          return `<img src='${require('../../assets/jg_white.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 1 && status === 1) {
          return `<img src='${require('../../assets/jg_green.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 1 && status === 2) {
          return `<img src='${require('../../assets/jg_yellow.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 1 && status === 3) {
          return `<img src='${require('../../assets/jg_red.png')}' style='width:40px;height:40px;'></img>`;
        }
        // 污水井
        if (deviceType === 2 && status === 0) {
          return `<img src='${require('../../assets/ws_white.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 2 && status === 1) {
          return `<img src='${require('../../assets/ws_green.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 2 && status === 2) {
          return `<img src='${require('../../assets/ws_yellow.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 2 && status === 3) {
          return `<img src='${require('../../assets/ws_red.png')}' style='width:40px;height:40px;'></img>`;
        }
        // 雨水井
        if (deviceType === 3 && status === 0) {
          return `<img src='${require('../../assets/ys_white.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 3 && status === 1) {
          return `<img src='${require('../../assets/ys_green.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 3 && status === 2) {
          return `<img src='${require('../../assets/ys_yellow.png')}' style='width:40px;height:40px;'></img>`;
        } else if (deviceType === 3 && status === 3) {
          return `<img src='${require('../../assets/ys_red.png')}' style='width:40px;height:40px;'></img>`;
        }
        return `<img src='${require('../../assets/jg_white.png')}' style='width:40px;height:40px;'></img>`;
      };
    },
    getStatusName() {
      return function(val) {
        if (val >= 20 && val <= 31) {
          return '较强';
        } else if (val >= 11 && val <= 19) {
          return '正常';
        } else if (val >= 1 && val <= 10) {
          return '较弱';
        } else {
          return '无信号';
        }
      };
    }
  },
  mounted() {
    this.ipToCenter();
    this.getMarkerList();
  },
  methods: {
    ipToCenter() {
      const url = `https://restapi.amap.com/v3/ip?output=json&key=d12759e632b81a0456db8ac83cedeb52`;
      axios.get(url).then(res => {
        const a = res.data.rectangle.split(';');
        const a1 = a[0].split(',');
        const a2 = a[1].split(',');
        const lng = (parseFloat(a1[0]) + parseFloat(a2[0])) / 2;
        const lat = (parseFloat(a1[1]) + parseFloat(a2[1])) / 2;
        this.mapCenter = [lng, lat];
      });
    },
    getMarkerList: function() {
      this.isloading = false;
      getDeviceMap({}).then(res => {
        this.markers = res.data;
        this.isloading = true;
      });
    },
    handleMarker(marker) {
      this.deviceName = marker.deviceName || '';
      if (marker.deviceModel === 1) {
        this.getDeviceInfosLogById(marker.id).then(res => {
          const tempArr1 = [];
          const tempArr2 = [];
          const tempArr3 = [];
          res.data.map((item, index) => {
            if (index === 0) {
              this.deviceLogsParams = {
                signalStrength: item.signalStrength,
                battery: item.battery,
                brightness: item.brightness,
                powerConsumption: item.powerConsumption,
                isTilt: item.isTilt,
                smokeWarning: item.smokeWarning
              };
            }
            tempArr1.push(item.updateTime);
            tempArr2.push(item.waterLevel);
            tempArr3.push(item.enTemperature);
          });
          this.RoutineWellData = {
            updateTime: tempArr1,
            waterLevel: tempArr2,
            enTemperature: tempArr3
          };
          this.dialogVisible1 = true;
        });
      } else if (marker.deviceModel === 2) {
        this.dialogVisible2 = true;
      } else if (marker.deviceModel === 3) {
        this.dialogVisible2 = true;
      }
    },

    async getDeviceInfosLogById(deviceId) {
      return await getDeviceInfosById(deviceId);
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-box {
    color: white;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 1080px;
}

.liquid-container {
    display: flex;
    justify-content: space-around;
}

.tortuous-container {
    width: 100%;
    height: 300px;
    margin-top: 40px;
}

.box-warp {
    height: 568px;
    padding: 80px 20px 0;
}
</style>

<style>
.amap-marker-label {
    min-width: 100px;
    min-height: 30px;
    text-align: center;
    vertical-align: middle;
    color: #00FFAA;
    font-size: 12px;
    white-space: nowrap;
    background: rgba(0, 255, 170, 0.2);
    border: 1px solid rgba(0, 255, 170, 0.41);
    border-radius: 1px;
}
</style>
