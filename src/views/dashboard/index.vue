<template>
  <div class="dashboard-container">
    <BoxWrap class="clazz01" title="井盖" subtext="设备告警" />

    <BoxWrap class="clazz02" title="井盖" subtext="告警信息" />

    <BoxWrap class="clazz03" title="雨水井" subtext="设备告警" />

    <BoxWrap class="clazz04" title="雨水井" subtext="告警信息" />

    <BoxWrap class="clazz05" title="污水井" subtext="设备告警" />

    <BoxWrap class="clazz06" title="污水井" subtext="告警信息" />
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
    position: relative;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.clazz01 {
  left: 10px;
}

.clazz02 {
  right: 10px;
}

.clazz03 {
  top: 450px;
  left: 10px;
}

.clazz04 {
  right: 10px;
  top: 450px;
}

.clazz05 {
  top: 750px;
  left: 10px;
}

.clazz06 {
  right: 10px;
  top: 750px;
}
</style>
