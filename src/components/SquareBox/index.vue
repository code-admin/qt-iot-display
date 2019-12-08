<template>
  <div class="boxWrap">
    <div class="horn">
      <div class="lt" />
      <div class="rt" />
      <!-- <div class="rm" /> -->
      <div class="rb" />
      <div class="lb" />
      <!-- <div class="lm" /> -->
    </div>
    <div class="slot-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SquareBox',
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.boxWrap {
    width: 214px;
    height: 214px;
    position: absolute;
    background-color: #031d2e79;

    .horn {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid #476479;

        >div {
            width: 25px;
            height: 25px;
            position: absolute;
        }

        .lt {
            border-top: 2px solid #00d3e7;
            border-left: 2px solid #00d3e7;
            left: -2px;
            top: -2px;
        }

        .rt {
            border-top: 2px solid #00d3e7;
            border-right: 2px solid #00d3e7;
            right: -2px;
            top: -2px;
        }

        .rm {
            border-right: 4px solid #00d3e7;
            right: -3px;
            top: calc(50% - 14.5px);
        }

        .rb {
            border-bottom: 2px solid #00d3e7;
            border-right: 2px solid #00d3e7;
            right: -2px;
            bottom: -2px;
        }

        .lb {
            border-bottom: 2px solid #00d3e7;
            border-left: 2px solid #00d3e7;
            left: -2px;
            bottom: -2px;
        }

        .lm {
            border-left: 4px solid #00d3e7;
            left: -3px;
            top: calc(50% - 14.5px);
        }
    }

    .slot-content {
        width: 100%;
        height: 100%;
        padding: 30px 20px 20px;
        overflow: hidden;
    }

}
</style>
