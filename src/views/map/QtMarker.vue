<template>
  <div>
    <el-amap-marker :position="marker.position" :vid="1212" :icon="markerIcon" title="点击查看设备信息" :label="marker.label" />
  </div>
</template>

<script>
export default {
  name: 'QtMarker',
  // props: {
  //   position: {
  //     type: Array,
  //     required: true
  //   },
  //   deviceStatus: {
  //     type: Number,
  //     default: 0
  //   },
  //   title: {
  //     type: String,
  //     default: '点击查看设备信息'
  //   },
  //   vid: {
  //     type: String,
  //     required: true
  //   }
  // },
  data() {
    return {
      dom_jg: "<img src='https://www.legendfly.site/image-shiding/pic_03.png' style='width:40px;height:40px;'></img>",
      dom_jg_red: "<img src='https://www.legendfly.site/image-shiding/pic_02.png' style='width:40px;height:40px;'></img>",
      dom_jg_disable: "<img src='https://www.legendfly.site/image-shiding/pic_05.png' style='width:40px;height:40px;'></img>",

      markerIcon: require('../../assets/jg.png'),
      marker: {
        position: [120.515051, 27.408898],
        label: {
          content: '井盖 #12',
          offset: [-10, -34]
        }
      }
    };
  },
  computed: {
    getContent: function(status) {
      if (status === 1) {
        return this.dom_jg;
      } else if (status === 2) {
        return this.dom_jg_red;
      }
      return this.dom_jg_disable;
    }
  },
  methods: {
    handleMarker() {
      window.alert('handleMarker');
    }
  }
};
</script>
