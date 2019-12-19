<template>
  <el-dialog custom-class="window-dialog" :visible.sync="visible" :width="width" :show-close="false">
    <template slot="title">
      <div class="qt-dialog-title-container">
        <div v-if="highlightTitle" class="highlight-title">{{ highlightTitle }}</div>
        <div>{{ title }}</div>
      </div>
    </template>
    <slot />
  </el-dialog>
</template>
<script>
export default {
  // 如果需要更多属性，可以对照 el-dialog 组件添加对应属性设置
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    width: {
      type: String,
      required: false,
      default: '1220px'
    },
    highlightTitle: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .window-dialog.el-dialog {
  background: url(../../assets/alert_window.png) top center no-repeat;
  background-size: contain;

  .el-dialog__header {
    width: 455px;

    margin: 0 auto;
    font-size: 26px;
    color: #ffffff;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }
  .qt-dialog-title-container {
    height: 40px;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .highlight-title {
      color: #ffff00;
    }
  }
  .el-dialog__body {
    padding: 30px 40px;
    color: #ffffff;
    overflow: hidden;
  }

}
</style>
