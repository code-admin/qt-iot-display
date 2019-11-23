<template>
  <div class="amap-page-container">
    <el-amap
      class="amap-box"
      vid="device-map-view"
      :map-style="mapStyle"
      :pitch="50"
      view-mode="2D"
      :center="mapCenter"
      :zoom="11"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapCenter: [120.515051, 27.408898],
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
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }
      ]
    };
  },
  methods: {}
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
