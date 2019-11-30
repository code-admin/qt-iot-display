<template>
  <div id="clock">
    {{ date }} {{ time }}
  </div>
</template>
<script>
export default {
  name: 'TimeClock',
  data() {
    return {
      date: '',
      time: ''
    };
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime: function() {
      var cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
    },
    zeroPadding: function(num, digit) {
      var zero = '';
      for (var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>
<style lang="scss" scoped>
#clock {
  width: 255px;
  text-align: left;
  font-size: 30px;
  font-family:UniDreamLED;
  font-weight: 400;
  letter-spacing: 3px;
  color:rgba(255,255,255,1);
}
</style>
