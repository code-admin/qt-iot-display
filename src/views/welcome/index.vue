<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">欢迎使用</h3>
      <h3 class="title">智能设备综合管理平台</h3>
    </div>
    <div class="carousel-container">
      <el-carousel :interval="4000" type="card" height="420px" :autoplay="false" indicator-position="none" arrow="always" @change="changeIndex">
        <el-carousel-item v-for="(item,index) in sections" :key="index" :class="['in'+ index, left === index ? 'left':'', right === index ? 'right':'']">
          <div class="medium" :data-item="item.url" @click="hander"> <img :src="item.img"> {{ item.text }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import zhgw from '../../assets/zhgw.png';
import zhaj from '../../assets/zhaj.png';
import zhny from '../../assets/zhny.png';
import znswpng from '../../assets/znswpng.png';
import zhxf from '../../assets/zhxf.png';

export default {
  name: 'Welcome',
  data() {
    return {
      cur: 0,
      left: 2,
      right: 3,
      sections: [
        { text: '智慧管网', url: '/', img: zhgw },
        { text: '智慧安监', url: '', img: zhaj },
        { text: '智慧能源', url: '', img: zhny },
        { text: '智能水务', url: '', img: znswpng },
        { text: '智慧消防', url: '', img: zhxf }
      ]
    };
  },
  methods: {
    changeIndex(e) {
      this.cur = e;
      this.right = e + 2 >= 5 ? (e + 2) - 5 : e + 2;
      this.left = e + 3 >= 5 ? (e + 3) - 5 : e + 3;
      console.log(this.cur, this.left, this.right);
    },
    hander(e) {
      const item = e.target.dataset.item;
      if (item) {
        this.$router.push({ path: item });
      } else {
        this.$alert('功能构建中', '系统提示');
      }
    }
  }
};
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    background: url(../../assets/loginbg.jpg) no-repeat;
    background-size: cover;

    .title-container {
        position: relative;
        text-align: center;
        margin-top: 135px;
        .title {
            opacity:0.8;
            width: 800px;
            height: 75px;
            font-size:72px;
            line-height: 1;
            font-weight:bold;
            margin: 60px auto 0;
            letter-spacing: 5px;
            color:rgba(255,255,255,1);
            background: linear-gradient(0deg,rgba(85,189,243,1) 0%, rgba(255,255,255,1) 100%);
            background-clip:text;
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
    }
}

.carousel-container {
  width: 1454px;
  max-width: 100%;
  margin: 80px auto 100px;
}

/deep/ .el-carousel {

  &.el-carousel--card{
    width: 948px;
    margin: 0 auto;
    overflow-x: initial;
  }

  &__item .medium {
    margin: 0;
    width: 360px;
    height: 404px;
    text-align: center;
    color: #fff;
    font-size: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 65px 10px 10px;
    box-sizing: border-box;

    img {
      pointer-events: none;
    }
  }

  &__item {
    background: url(../../assets/card-bg.png) center no-repeat;
    background-size: contain;
    width: 360px;
    height: 454px;
    box-shadow:0px 0px 100px 0px rgba(7,57,125,1);
    border-radius: 12px;

    &--card {
      &:not(.is-in-stage) {
        &.left{
          transform: translateX(-250.71px) scale(0.6)!important;
        }

        &.right {
          transform: translateX(750.71px) scale(0.6)!important;
        }
      }

    }
  }

  &__arrow {
    width: 88px;
    height: 88px;
    background: url(../../assets/arrow.png) center no-repeat;
    &--left {
      left: -290px;
      transform: rotateY(180deg) translateY(-50%);
    }
    &--right {
      right: -190px;
    }
    i {
      display: none;
    }
  }
}

</style>
