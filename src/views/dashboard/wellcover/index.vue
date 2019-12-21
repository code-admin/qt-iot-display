<template>
  <div class="dashboard-container">
    <box-wrap class="clazz01" title="井盖" subtext="设备告警">
      <waveform :data="waveformData" />
    </box-wrap>
    <box-wrap class="clazz02" title="井盖" subtext="设备告警排行">

      <el-row :gutter="20" class="tied">
        <el-col :span="12">
          <el-table class="wrap-table" :data="top1">
            <el-table-column prop="index" label="名次">
              <template slot-scope="scope">
                <div :class="scope.row.index < 4 ? 'top3':''">
                  {{ scope.row.index }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="deviceNumber" label="设备编号" class-name="cell-primary" />
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table class="wrap-table" :data="top2">
            <el-table-column prop="index" label="名次" />
            <el-table-column prop="deviceNumber" label="设备编号" class-name="cell-primary" />
          </el-table>
        </el-col>
      </el-row>

    </box-wrap>
    <box-wrap class="clazz03" title="井盖" subtext="告警总数量">
      <alarm-total />
    </box-wrap>
    <box-wrap class="clazz04" title="井盖" subtext="实时水位变化">
      <water-level :data="waterChange" />
    </box-wrap>
    <box-wrap class="clazz05" title="井盖" subtext="告警信息">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="180" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </box-wrap>
    <box-wrap class="clazz06" title="井盖" subtext="智能状态">
      <doughnut :data="doughnutData" />
    </box-wrap>

    <div class="rect-container">
      <RectWrap title="设备总数" :value="88.88" color="#FFBF7F" unit="万台" :total="88.88" />
      <RectWrap title="在线设备数" :value="88" unit="万台" />
      <RectWrap title="告警设备数" :value="65" color="#66B3FF" />
    </div>
  </div>
</template>

<script>
import BoxWrap from '@/components/BoxWrap';
import RectWrap from '@/components/RectWrap';
import AlarmTotal from '../charts/AlarmTotal';
import Doughnut from '@/components/Doughnut';
import Waveform from '@/components/Waveform';
import WaterLevel from '@/components/WaterLevel';
export default {
  name: 'Wellcover',
  components: {
    BoxWrap,
    RectWrap,
    AlarmTotal,
    WaterLevel,
    Waveform,
    Doughnut
  },
  data() {
    return {
      waveformData: [],
      tableData: [
        { date: '2019/11/07 12:05:08', name: '井盖23', type: '水位过高', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2019/11/06 02:24:12', name: '井盖34', type: '过度倾斜', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2019/11/04 19:02:38', name: '井盖25', type: '电量过低', address: '上海市普陀区金沙江路 1519 弄' },
        { date: '2019/12/14 09:44:23', name: '井盖25', type: '离线告警', address: '上海市普陀区金沙江路 1511 弄' },
        { date: '2019/10/01 13:51:52', name: '井盖36', type: '设备溢满', address: '上海市普陀区金沙江路 1516 弄' }
      ],
      top1: [
        { index: 1, deviceNumber: '井盖1' },
        { index: 2, deviceNumber: '井盖2' },
        { index: 3, deviceNumber: '井盖3' },
        { index: 4, deviceNumber: '井盖4' },
        { index: 5, deviceNumber: '井盖5' }
      ],
      top2: [
        { index: 6, deviceNumber: '井盖6' },
        { index: 7, deviceNumber: '井盖7' },
        { index: 8, deviceNumber: '井盖8' },
        { index: 9, deviceNumber: '井盖9' },
        { index: 10, deviceNumber: '井盖10' }
      ],
      waterChange: [],
      doughnutData: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.waveformData = {
        reportTime: ['28/11', '29/11', '30/11', '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'],
        options: [
          { name: 'COD氨氮', values: [180, 165, 189.99, 150.12, 163.32, 169.21, 171.28, 165.78, 181.21, 179.21] },
          { name: 'PH酸碱度', values: [5, 7, 6.99, 8.55, 11.32, 5.21, 6.28, 7.98, 9.21, 11.21] }
        ]
      };
      this.doughnutData = [
        { name: '正常', value: 36 }, { name: '未激活', value: 36 }, { name: '信号告警', value: 28 }, { name: '电量告警', value: 36 }, { name: '亮度告警', value: 36 },
        { name: '倾斜', value: 28 }, { name: '水位告警', value: 36 }, { name: '离线', value: 36 }, { name: '溢满', value: 28 }, { name: '烟雾告警', value: 36 }
      ];
      this.waterChange = [
        { name: '井08', typeName: '离线', value: 0.7, type: 'offline' },
        { name: '井09', typeName: '告警', value: 0.5, type: 'warn' },
        { name: '井10', typeName: '正常', value: 0.92, type: 'normal' },
        { name: '井11', typeName: '离线', value: 0.85, type: 'offline' },
        { name: '井12', typeName: '故障', value: 1.1, type: 'fault' }
      ];
      this.paly();
    },
    paly() {
      setInterval(this.change, 2000);// 每两秒执行一次插入删除操作
    },
    change() {
      this.tableData.push(this.tableData[0]);// 把第一条数据插入数组最有一条
      this.tableData.shift();// 删除数组中第一条数据
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
        position: relative;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.clazz01 {
    left: 10px;
}

.clazz02 {
    right: 10px;

    .top3 {
        font-size: 16px;
        font-family: DINPro;
        font-weight: bold;
        font-style: italic;
        color: rgba(204, 82, 82, 1);
    }
}

.clazz03 {
    top: 450px;
    left: 10px;
}

.clazz04 {
    right: 10px;
    top: 450px;
}

.clazz05 {
    top: 750px;
    left: 10px;
}

.clazz06 {
    right: 10px;
    top: 750px;
}
.square-box1{
  left: 587px;
  top: 790px;
}
.square-box2{
  left: 823px;
  top: 790px;
}
.square-box3{
  left: 1058px;
  top: 790px;
}

.rect-container {
  top: 790px;
  left: 50%;
  height: 214px;
  display: flex;
  margin: 0 auto;
  min-width: 695px;
  position: absolute;
  transform: translateX(-50%);
  justify-content: space-around;
  // background-color: #3739472d;
}

.tied /deep/ .wrap-table.el-table{
    th,
    tr,
    td {
        padding: 7px 0;
    }
}
</style>
