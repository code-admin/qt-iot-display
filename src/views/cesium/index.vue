<template>
  <div class="viewer">
    <vc-viewer
      ref="viewer"
      :animation="animation"
      :timeline="timeline"
      :camera.sync="camera"
      :base-layer-picker="baseLayerPicker"
      :fullscreen-button="fullscreenButton"
      :home-button="homeButton"
      :scene-mode-picker="sceneModePicker"
      :vr-button="vrButton"
      :info-box="infoBox"
      scene3d-only
      shadows
      projection-picker
      @ready="ready"
    >
      <vc-entity ref="entity1" :position="position1" :description="description" :cylinder.sync="cylinder1">
        <vc-graphics-cylinder
          :length="400000.0"
          :top-radius="200000.0"
          :bottom-radius="200000.0"
          :material="material1"
          :outline="true"
          :outline-color="outlineColor1"
        />
        <vc-layer-imagery>
          <vc-provider-imagery-tianditu map-style="img_c" :token="tk" />
        </vc-layer-imagery>
      </vc-entity></vc-viewer>

    <div class="demo-tool">
      <span>动画部件</span>
      <el-switch v-model="animation" />
      <span>时间轴部件</span>
      <el-switch v-model="timeline" />
      <span>基础图层拾取器</span>
      <el-switch v-model="baseLayerPicker" />
      <span>全屏按钮</span>
      <el-switch v-model="fullscreenButton" />
      <span>信息提示框</span>
      <el-switch v-model="infoBox" />
    </div>
  </div>
</template>

<script>
// import 'vue-cesium/lib/vc-navigation.css';
export default {
  name: 'Cesum',
  data() {
    return {
      animation: true,
      timeline: true,
      baseLayerPicker: true,
      fullscreenButton: true,
      homeButton: true,
      sceneModePicker: true,
      vrButton: true,
      infoBox: true,

      requestWaterMask: true,
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

      material1: {},
      outlineColor1: 'DARK_GREEN',
      description: 'Hello Vue Cesium',
      position1: { lng: 120.0, lat: 30.0, height: 200000.0 },
      cylinder1: {},

      tk: '436ce7e50d27eede2f2929307e6b33c0'
    };
  },
  mounted() {
    this.$refs.viewer.createPromise.then(({
      Cesium,
      viewer
    }) => {
      console.log('viewer is loaded.', Cesium, viewer);
    });

    Promise.all([this.$refs.entity1.createPromise]).then((instances) => {
      instances[0].viewer.zoomTo(instances[0].viewer.entities);
    });
  },
  methods: {
    ready(cesiumInstance) {
      const { Cesium, viewer } = cesiumInstance;
      var target = new Cesium.Cartesian3(300770.50872389384, 5634912.131394585, 2978152.2865545116);
      var offset = new Cesium.Cartesian3(6344.974098678562, -793.3419798081741, 2499.9508860763162);
      viewer.camera.lookAt(target, offset);
      viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

      this.material1 = Cesium.Color.GREEN.withAlpha(0.5);
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
