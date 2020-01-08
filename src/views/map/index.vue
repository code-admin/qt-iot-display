<template>
  <div class="amap-page-container">
    <el-amap
      ref="map"
      class="amap-box"
      vid="device-map-view"
      :amap-manager="amapManager"
      :events="events"
      :map-style="mapStyle"
      :pitch="50"
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

    <!-- 窗口信息 -->
    <qt-dialog :visible.sync="dialogVisible" :highlight-title="deviceName" title="设备置信参数">
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
import { AMapManager } from 'vue-amap';
import LiquidFill from '@/components/LiquidFill';
import TortuousLine from '@/components/TortuousLine';

import { getDeviceMap } from '@/api/dashboard';

const amapManager = new AMapManager();
export default {
  components: {
    LiquidFill,
    TortuousLine
  },
  data() {
    return {
      isloading: false,
      dialogVisible: false,
      amapManager,
      // 可以根据项目 经纬度来设置地图中心点
      mapCenter: [120.500439, 27.366849],
      zoom: 11,
      events: {
        init: o => {
          // console.log(o.getCenter());
          // console.log('???????????', this.$refs.map.$getInstance());
          // o.getCity(result => {
          //   console.log(result);
          // });

          // 设置区域地图
          this.setMap();
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          // alert('map clicked');
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log(o);
          }
        }
      }],
      mapStyle: 'amap://styles/f8fa7a6a6b7eb457f6bcdcb91abd0529',
      markers: [],
      map: null,
      componentMap: null,
      deviceName: null
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
    }
  },
  mounted() {
    this.getMarkerList();
  },
  methods: {
    // 获取地图实例
    setMap() {
      const _AMap = window.AMap;
      const _map = amapManager.getMap();
      _map.getCity(result => {
        // console.log('============', result.district);
        const districtName = result.district;
        // 行政区查询服务，提供了根据名称关键字、citycode、adcode 来查询行政区信息的功能
        new _AMap.DistrictSearch({
          extensions: 'all',
          subdistrict: 0
        }).search(districtName, function(status, result) {
          // 外多边形坐标数组和内多边形坐标数组
          const outer = [
            new _AMap.LngLat(-360, 90, true),
            new _AMap.LngLat(-360, -90, true),
            new _AMap.LngLat(360, -90, true),
            new _AMap.LngLat(360, 90, true)
          ];
          const holes = result.districtList[0].boundaries;
          const pathArray = [
            outer
          ];
          pathArray.push.apply(pathArray, holes);
          const polygon = new _AMap.Polygon({
            pathL: pathArray,
            // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
            strokeColor: 'rgb(20,164,173)',
            strokeWeight: 2,
            // 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
            strokeOpacity: 0.88,
            // 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
            fillColor: 'rgba(1,22,42)',
            // 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
            fillOpacity: 0.9,
            // 轮廓线样式，实线:solid，虚线:dashed
            strokeStyle: 'dashed',
            /* 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在
                                                                                                                                                                          ie9+浏览器有效 取值：
                                                                                                                                                                          实线：[0,0,0]
                                                                                                                                                                          虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
                                                                                                                                                                          点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实
                                                                                                                                                                          线和10个像素的空白 （如此反复）组成的虚线
                                                                                                                                                                        */
            strokeDasharray: [10, 2, 10]
          });
          polygon.setPath(pathArray);
          _map.add(polygon);
        });
      });
    },
    getMarkerList: function() {
      this.isloading = false;
      getDeviceMap({}).then(res => {
        this.markers = res.data;
        this.isloading = true;
      });
      // this.markers = [
      //   { position: [120.452218, 27.525692], deviceType: 1, deviceStatus: 1, label: { content: '井盖 #11', offset: [-30, -25] }}
      // ];
    },
    handleMarker(marker) {
      this.deviceName = marker.deviceName || '';
      this.dialogVisible = !this.dialogVisible;
      // console.log(marker);
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
