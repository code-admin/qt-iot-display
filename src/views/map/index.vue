<template>
  <div class="amap-page-container">
    <el-amap
      class="amap-box"
      vid="device-map-view"
      :map-style="mapStyle"
      :pitch="50"
      :view-mode="'3D'"
      :center="mapCenter"
      :zoom="12"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 12,
      mapCenter: [120.431097, 27.497131],
      events: {
        init: (o) => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {},
        'zoomchange': () => {},
        'click': (e) => {
          alert('map clicked')
        }
      },
      mapStyle: 'amap://styles/f57738f096432e7144a508bb11263f49',
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log(o)
          }
        }
      }]
    }
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
.amap-box {
    width: 100%;
    height: calc(100vh - 50px);
}
</style>
