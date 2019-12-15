<template>
  <div>
    <TopMenu class="topmenu-container" />
    <div class="display-container">
      <amap />
      <router-view :key="key" class="core-container" />
    </div>
  </div>
</template>

<script>
import TopMenu from './TopMenu';
import Amap from '@/views/map/index';
export default {
  name: 'DisplayLayout',
  components: {
    TopMenu,
    Amap
  },
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>
<style lang="scss" scoped>
.topmenu-container {
  color: white;
  width: 100%;
  height: 145px;
  padding: 20px;
  top: 0;
  left: 0;
  z-index: 3;
  position: relative;
  background: url(../assets/de.png) center 50px no-repeat;
}
.display-container {
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
.core-container {
  color: white;
  position: relative;
  padding: 145px 30px 30px 30px;
  z-index: 2;
  margin: 0;
  box-sizing: border-box;
}
</style>
