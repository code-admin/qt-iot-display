<template>
  <div>
    <el-amap ref="amap" class="amap-demo" vid="device-map-view" :amap-manager="amapManager" :events="events" :center="center" :zoom="zoom">
      <el-amap-marker v-for="marker in markers" :key="marker.id" :position="marker.position" />
    </el-amap>
  </div>
</template>

<style lang="scss" scoped>
.amap-demo {
    width: 100%;
    height: 500px;
}
</style>

<script>
import { AMapManager } from 'vue-amap';
import { getDeviceMap } from '@/api/dashboard';
const amapManager = new AMapManager();

module.exports = {
  data: function() {
    const self = this;
    return {
      amapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      markers: [],
      markerRefs: [],
      events: {
        init: (o) => {
          setTimeout(() => {
            console.log(self.markerRefs);
            const cluster = new window.AMap.MarkerClusterer(o, self.markerRefs, {
              gridSize: 80,
              renderCluserMarker: self._renderCluserMarker
            });
            console.log(cluster);
          }, 1000);
        },
        'moveend': () => {},
        'zoomchange': () => {},
        'click': (e) => {
          alert('map clicked');
        }
      }
    };
  },
  mounted() {
    this.getMarkers();
  },
  methods: {
    getMarkers() {
      getDeviceMap({}).then(res => {
        this.markers = res.data;
      });
    },

    _renderCluserMarker(context) {
      const count = this.markers.length;

      const factor = Math.pow(context.count / count, 1 / 18);
      const div = document.createElement('div');
      const Hue = 180 - factor * 180;
      const bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
      const fontColor = 'hsla(' + Hue + ',100%,20%,1)';
      const borderColor = 'hsla(' + Hue + ',100%,40%,1)';
      const shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
      div.style.backgroundColor = bgColor;
      const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
      div.style.width = div.style.height = size + 'px';
      div.style.border = 'solid 1px ' + borderColor;
      div.style.borderRadius = size / 2 + 'px';
      div.style.boxShadow = '0 0 1px ' + shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size + 'px';
      div.style.color = fontColor;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new window.AMap.Pixel(-size / 2, -size / 2));
      context.marker.setContent(div);
    }
  }
};
</script>
