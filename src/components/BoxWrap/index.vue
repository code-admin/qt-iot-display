<template>
  <div class="boxWrap">
    <div class="horn">
      <div class="lt" />
      <div class="rt" />
      <div class="rm" />
      <div class="rb" />
      <div class="lb" />
      <div class="lm" />
    </div>
    <div class="title-text">
      <span>{{ title }}</span>
      <span>{{ subtext }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxWrap',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.boxWrap {
  width: 555px;
  height: 255px;
  position: absolute;
  background-color: #00d4e705;

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid rgb(82, 82, 82);
    > div {
      width: 25px;
      height: 25px;
      position: absolute;
    }
    .lt {
      border-top: 4px solid #00d3e7;
      border-left: 4px solid #00d3e7;
      left: -3px;
      top: -3px;
    }
    .rt {
      border-top: 4px solid #00d3e7;
      border-right: 4px solid #00d3e7;
      right: -3px;
      top: -3px;
    }
    .rm {
      border-right: 4px solid #00d3e7;
      right: -3px;
      top: calc(50% - 14.5px);
    }
    .rb {
      border-bottom: 4px solid #00d3e7;
      border-right: 4px solid #00d3e7;
      right: -3px;
      bottom: -3px;
    }
    .lb {
      border-bottom: 4px solid #00d3e7;
      border-left: 4px solid #00d3e7;
      left: -3px;
      bottom: -3px;
    }
    .lm {
      border-left: 4px solid #00d3e7;
      left: -3px;
      top: calc(50% - 14.5px);
    }
  }
}
</style>
