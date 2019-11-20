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
    <div class="title-context">
      <div class="lt" />
      <div class="rt" />
      <div class="rm" />
      <div class="rb" />
      <div class="lb" />
      <div class="lm" />
      <div class="title">
        <span>{{ title }}</span>
        <span>{{ subtext }}</span>
      </div>
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
  background-color: #031d2e79;

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px double #476479;
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

  .title-context {
    width: 265px;
    height: 40px;
    left: 50%;
    top: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: #011122;
    border: 2px solid #354a59;
    > div {
      width: 8px;
      height: 8px;
      position: absolute;
    }
    .lt {
      border-top: 3px solid #00d3e7;
      border-left: 3px solid #00d3e7;
      left: -3px;
      top: -3px;
    }
    .rt {
      border-top: 3px solid #00d3e7;
      border-right: 3px solid #00d3e7;
      right: -3px;
      top: -3px;
    }
    .rm {
      border-right: 3px solid #00d3e7;
      right: -3px;
      top: calc(50% - 4px);
    }
    .rb {
      border-bottom: 3px solid #00d3e7;
      border-right: 3px solid #00d3e7;
      right: -3px;
      bottom: -3px;
    }
    .lb {
      border-bottom: 3px solid #00d3e7;
      border-left: 3px solid #00d3e7;
      left: -3px;
      bottom: -3px;
    }
    .lm {
      border-left: 3px solid #00d3e7;
      left: -3px;
      top: calc(50% - 4px);
    }

    .title {
      width: 100%;
      height: 100%;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      font-weight: bold;
      letter-spacing: 2px;
      text-shadow: 0 0 25px #fcf58e;
      span:first-of-type {
        color: #fcf58e;
      }
    }
  }
}
</style>
