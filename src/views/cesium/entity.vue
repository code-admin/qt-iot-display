<template>
  <div class="viewer">
    <vc-viewer
      ref="viewer"
      animation
      timeline
      base-layer-picker
      ullscreen-button
      home-button
      scene-mode-picker
      vr-button
      info-box
      projection-picker
      @ready="ready"
    >
      <vc-entity :position="position1" :description="description" :model.sync="model1" :label.sync="label1">
        <vc-graphics-label ref="label" text="正在加载模型中……" font="20px sans-serif" />
        <vc-graphics-model ref="model" :uri="uri1" />
      </vc-entity>
    </vc-viewer>

  </div>
</template>

<script>
// const glb = require('../../assets/glModels/GroundVehicle.glb');
export default {
  name: 'Entity',
  data() {
    return {
      camera: {
        position: {
          lng: 121.60469044659422,
          lat: 31.171291973195242,
          height: 10000000
        },
        heading: 360,
        pitch: -60,
        roll: 0
      },
      description: '契通物联',
      model1: {},
      label1: {},
      position1: { lng: 114.0, lat: 40.0, height: 1.0 },
      uri1: 'https://zouyaoji.top/vue-cesium/statics/SampleData/models/GroundVehicle/GroundVehicle.glb'
    };
  },
  mounted() {
    Promise.all([this.$refs.label.createPromise, this.$refs.model.createPromise]).then((instances) => {
      instances[0].viewer.zoomTo(instances[0].viewer.entities);
    });
  },
  methods: {
    ready(cesiumInstance) {
      const {
        Cesium,
        viewer
      } = cesiumInstance;
      console.log(Cesium,
        viewer);
    }
  }
};
</script>

<style lang="scss" scoped>
.viewer {
    width: 100%;
    height: 100%;
}
</style>
