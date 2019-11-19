<template>
  <div>
    <div class="flex-top">
      <div class="weather">降水量：53.6ml-气压：102kPa-PM 2.5:13（优）</div>
      <div class="title">智能设备综合管理平台</div>
      <div class="date">2018-02-26 08:01:20</div>
    </div>
    <div class="navigate">
      <div>
        <router-link to="/example">磁贴管理</router-link>
        <router-link to="/example">综合概况</router-link>
      </div>
      <div>
        <router-link to="/example">井盖设备</router-link>
        <router-link to="/example">水质监测</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.flex-top {
  display: flex;
  font-size: 24px;
  font-weight: bold;
  > div {
    min-width: 445px;
    text-align: center;
  }
}
.weather {
  font-size: 20px;
  font-weight: normal;
}
.title {
  letter-spacing: 14px;
  margin: 0 auto;
  padding-top: 5px;
  font-size: 52px;
  font-weight: bold;
  display: inline-block;
  text-shadow: 0 0 30px #ffffff62;
}

.navigate {
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
  > div {
    width: 430px;
    display: flex;
    justify-content: space-around;
  }
}
a {
  width: 170px;
  height: 38px;
  cursor: pointer;
  color: white;
  font-size: 19px;
  font-weight: bold;
  line-height: 38px;
  text-align: center;
  display: inline-block;
  background-color: rgba(25, 47, 73, 0.658);
}
</style>