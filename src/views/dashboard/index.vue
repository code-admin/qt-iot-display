<template>
  <div class="dashboard-container">
    <BoxWrap title="井盖" subtext="设备告警" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BoxWrap from '@/components/BoxWrap';

export default {
  name: 'Dashboard',
  components: {
    BoxWrap
  },
  computed: {
    ...mapGetters(['name'])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
