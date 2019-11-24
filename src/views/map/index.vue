<template>
  <div class="amap-page-container">
    <el-amap class="amap-box" vid="device-map-view" :map-style="mapStyle" :pitch="50" view-mode="2D" :center="mapCenter" :zoom="18">
      <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :content="getContentByDeviceStatus(marker.deviceStatus)" :vid="index" title="点击查看设备信息" :offset="[-14,-14]" :label="marker.label" />
    </el-amap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dom_jg: "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:40px;height:40px;'></img>",
      dom_jg_red: "<img src='https://www.legendfly.site/image-shiding/pic_02.png' style='width:40px;height:40px;'></img>",
      dom_jg_disable: "<img src='https://www.legendfly.site/image-shiding/pic_05.png' style='width:40px;height:40px;'></img>",
      // 可以根据项目 经纬度来设置地图中心点
      mapCenter: [120.45247, 27.525297],
      events: {
        init: o => {
          console.log(o.getCenter());
          console.log(this.$refs.map.$getInstance());
          o.getCity(result => {
            // console.log(result)
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          alert('map clicked');
        }
      },
      mapStyle: 'amap://styles/f8fa7a6a6b7eb457f6bcdcb91abd0529',
      markers: []
    };
  },
  computed: {
    getContentByDeviceStatus() {
      return function(status) {
        if (status === 1) {
          return this.dom_jg;
        } else if (status === 2) {
          return this.dom_jg_red;
        }
        return this.dom_jg_disable;
      };
    }
  },
  mounted() {
    this.getMarkerList();
  },
  methods: {
    getMarkerList: function() {
      this.markers = [{
        position: [120.452218, 27.525692],
        deviceStatus: 1,
        label: {
          content: '井盖 #11',
          offset: [-10, -20]
        }
      },
      {
        position: [120.451188, 27.527262],
        deviceStatus: 2,
        label: {
          content: '井盖 #12',
          offset: [-10, -20]
        }
      },
      {
        position: [120.451617, 27.526658],
        deviceStatus: 1,
        label: {
          content: '井盖 #13',
          offset: [-10, -20]
        }
      },
      {
        position: [120.451934, 27.526206],
        deviceStatus: 1,
        label: {
          content: '井盖 #14',
          offset: [-10, -20]
        }
      },
      {
        position: [120.453784, 27.523256],
        deviceStatus: 2,
        label: {
          content: '井盖 #15',
          offset: [-10, -20]
        }
      },
      {
        position: [120.452738, 27.524712],
        deviceStatus: 1,
        label: {
          content: '井盖 #16',
          offset: [-10, -20]
        }
      },
      {
        position: [120.453511, 27.52378],
        deviceStatus: 1,
        label: {
          content: '井盖 #17',
          offset: [-10, -10]
        }
      }
      ];
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
</style>
