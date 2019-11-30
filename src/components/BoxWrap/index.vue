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
        <template v-if="multiple">
          <el-dropdown class="title__wrap" placement="bottom" trigger="click" @command="tapCatalog">
            <span class="el-dropdown-link">
              {{ catalog }}<i v-if="multiple" class="el-icon-caret-bottom" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in selectList" :key="item" :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else><span @click="tapCatalog">{{ catalog }}</span></template>
        <!-- <span :class="multiple?'pointer':''" @click="tapCatalog"> -->
        <span class="subtext">{{ subtext }}</span>
      </div>
    </div>
    <div class="slot-content">
      <slot />
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
    selectList: {
      type: Array,
      default: () => []
    },
    subtext: {
      type: String,
      default: ''
    },
    change: {
      type: Function,
      default: undefined
    }
  },
  data() {
    const catalog = this.title || this.selectList[0];
    const multiple = this.selectList.length > 1;
    return {
      current: 0,
      catalog: catalog,
      multiple: multiple
    };
  },
  methods: {
    tapCatalog(e) {
      const callback = this.change;
      const command = typeof e === 'object' ? this.catalog : e;
      if (callback && typeof callback === 'function') {
        callback(this.selectList.findIndex(e => e === command) || 0);
        this.catalog = command;
      }
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
      text-shadow: 0 0 25px #FFF368;
      user-select: none;

      &__wrap.el-dropdown {
        height: 100%;
        font-size: 20px;

      }

      span:first-of-type:not(.subtext) {
        color: #FFF368;
        &.pointer {
          cursor: pointer;
        }
        i {
          color: white;
          margin: 0 4px 0 0;
          font-size: 16px;
          letter-spacing: 0;
        }
      }
    }
  }

  .slot-content {
    width: 100%;
    height: 100%;
    padding: 30px 20px 20px;
    overflow: hidden;
  }
}
.el-dropdown-menu {
    border: 1px solid rgba(255,243,104,.16);
    background:rgba(255,243,104,.16);
    &__item{
      color: white;
      &:hover {
          background-color: rgba(255,243,104,.2);
          color: white;
      }
    }
}
.el-popper[x-placement^=bottom]{
    margin-top: 0;
}
</style>
