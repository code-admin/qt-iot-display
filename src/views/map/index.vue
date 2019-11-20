<template>
  <div class="amap-page-container">
    <el-amap class="amap-box" vid="device-map-view" :map-style="mapStyle" :pitch="50" view-mode="2D" :center="mapCenter" :zoom="12" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 12,
      mapCenter: [120.431097, 27.497131],
      events: {
        init: o => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          alert('map clicked')
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
              console.log(o)
            }
          }
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.amap-box {
    color: white;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
