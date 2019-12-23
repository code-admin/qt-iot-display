<template>
  <div class="wrap">
    <div class="content">
      <p> 降水量：53.6ml-气压：102kPa-PM 2.5:13（优）</p>
      <p> 风向：东南风-风速：21M/H（三级）</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.wrap {
    height: 40px;
    overflow: hidden;
    position: absolute;
    top: 40;
    left: 5;
    width: 100%
}

p {
    margin: 0;
    height: 40px;
    width: 550px;
    overflow: hidden;
}

.content p {
    position: absolute;
}

@-webkit-keyframes anim1 {
    0% {
        top: 40px;
        opacity: 1
    }

    16.67% {
        top: 0px;
        opacity: 1
    }

    33.33% {
        top: 0px;
        opacity: 1
    }

    50% {
        top: -40px;
        opacity: 0
    }

    100% {
        top: 40px;
        opacity: 0
    }
}

@-webkit-keyframes anim2 {

    0% {
        top: 0px;
        opacity: 0
    }

    50% {
        top: 40px;
        opacity: 0
    }

    66.67% {
        top: 0px;
        opacity: 1
    }

    83.33% {
        top: 0px;
        opacity: 1
    }

    100% {
        top: -40px;
        opacity: 1
    }
}

.content p:nth-child(1) {

    -webkit-animation: anim1 8s linear infinite;
}

.content p:nth-child(2) {

    -webkit-animation: anim2 8s linear infinite;
}
</style>
