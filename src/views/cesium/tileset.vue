<template>
  <div class="viewer">
    <vc-viewer @ready="ready">
      <vc-primitive-tileset :url="url" @readyPromise="readyPromise" @initialTilesLoaded="initialTilesLoaded" @allTilesLoaded="allTilesLoaded" @loadProgress="loadProgress" @tileFailed="tileFailed" @tileLoad="tileLoad" @tileUnload="tileUnload" @tileVisible="tileVisible" />
    </vc-viewer>
    <div class="demo-tool">
      <span>切换地址</span>
      <el-select v-model="url" placeholder="切换地址">
        <el-option v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://zouyaoji.top/vue-cesium/statics/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json',
      options: [{
        value: 'https://zouyaoji.top/vue-cesium/statics/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json',
        label: 'tileset one'
      },
      {
        value: 'https://zouyaoji.top/vue-cesium/statics/SampleData/Cesium3DTiles/Hierarchy/BatchTableHierarchy/tileset.json',
        label: 'tileset two'
      }
      ]
    };
  },
  methods: {
    ready(cesiumInstance) {
      this.cesiumInstance = cesiumInstance;
      const {
        Cesium,
        viewer
      } = cesiumInstance;
      console.log(Cesium, viewer);
    },
    readyPromise(tileset) {
      const {
        Cesium,
        viewer
      } = this.cesiumInstance;
      viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0));
    },
    allTilesLoaded() {
      console.log('All tiles are loaded');
    },
    initialTilesLoaded() {
      console.log('Initial tiles are loaded');
    },
    loadProgress(numberOfPendingRequests, numberOfTilesProcessing) {
      if (numberOfPendingRequests === 0 && numberOfTilesProcessing === 0) {
        console.log('Stopped loading');
        return;
      }

      console.log('Loading: requests: ' + numberOfPendingRequests + ', processing: ' + numberOfTilesProcessing);
    },
    tileFailed(error) {
      console.log('An error occurred loading tile: ' + error.url);
      console.log('Error: ' + error.message);
    },
    tileLoad(tile) {
      console.log('A tile was loaded.');
    },
    tileUnload(tile) {
      console.log('A tile was unloaded from the cache.');
    },
    tileVisible(tile) {}
  }
};
</script>
