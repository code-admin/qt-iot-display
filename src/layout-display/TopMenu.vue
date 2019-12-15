<template>
  <div>
    <div class="flex-top">
      <div class="weather">降水量：53.6ml-气压：102kPa-PM 2.5:13（优）</div>
      <div class="title"><!-- 智能设备综合管理平台 --></div>
      <div class="date"><TimeClock /></div>
    </div>
    <div class="navigate">
      <div>
        <router-link to="/example">磁贴管理</router-link>
        <router-link to="/dashboard">综合概况</router-link>
      </div>
      <div>
        <router-link to="/dashboard/wellcover">井盖设备</router-link>
        <router-link to="/dashboard/water">水质监测</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TimeClock from '@/components/TimeClock';
export default {
  components: {
    TimeClock: TimeClock
  }
};
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
  height: 125px;
  width: 930px;
  margin-top: -25px;
  font-size:52px;
  // color:rgba(255,255,255,0);
  // text-shadow: 0 0 30px #ffffff62;
  background: url(../assets/title.png) center top no-repeat;

}
.date {
  display: flex;
  justify-content: center;
}
.navigate {
  display: flex;
  padding: 0 50px;
  margin-top: -30px;
  justify-content: space-between;
  > div {
    width: 430px;
    display: flex;
    justify-content: space-around;
  }
}
.navigate a {
  width: 174px;
  height: 45px;
  cursor: pointer;
  color: white;
  font-size: 19px;
  font-weight: bold;
  line-height: 42px;
  text-align: center;
  display: inline-block;
  background: url(../assets/btn.png) no-repeat;
  transition: none;
}

.navigate a:hover,.navigate .router-link-exact-active.router-link-active{
  text-shadow: 0 0 20px #00ffff66;
  box-shadow: 0 0 20px 0 #00ffff66;
  background-position-x: -174.5px;
  transition: box-shadow 0.4s;
}
</style>
