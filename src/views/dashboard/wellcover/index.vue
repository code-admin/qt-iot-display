<template>
  <div class="dashboard-container">
    <box-wrap class="clazz01" title="井盖" subtext="设备告警">
      <device-alarm />
    </box-wrap>
    <box-wrap class="clazz02" title="井盖" subtext="设备告警排行">

      <el-row :gutter="20">
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
    <box-wrap class="clazz04" title="井盖" subtext="实时水位变化" />
    <box-wrap class="clazz05" title="井盖" subtext="告警信息">
      <el-table class="wrap-table" :data="tableData">
        <el-table-column prop="date" label="时间" width="180" />
        <el-table-column prop="name" label="设备名称" class-name="cell-primary" width="80" />
        <el-table-column prop="type" label="告警类型" class-name="cell-warning" width="80" />
        <el-table-column prop="address" label="地址" show-overflow-tooltip />
      </el-table>
    </box-wrap>
    <box-wrap class="clazz06" title="井盖" subtext="智能状态" />
  </div>
</template>

<script>
import BoxWrap from '@/components/BoxWrap';
import AlarmTotal from '../charts/AlarmTotal';
import DeviceAlarm from '../charts/DeviceAlarm';
export default {
  name: 'Wellcover',
  components: {
    BoxWrap,
    AlarmTotal,
    DeviceAlarm
  },
  data() {
    return {
      tableData: [{
        date: '2019/11/07 12:05:08',
        name: '井盖',
        type: '水位过高',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2019/11/06 02:24:12',
        name: '井盖34',
        type: '过度倾斜',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2019/11/04 19:02:38',
        name: '井盖25',
        type: '电量过低',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2019/10/01 13:51:52',
        name: '井盖36',
        type: '设备溢满',
        address: '上海市普陀区金沙江路 1516 弄'
      }
      ],
      top1: [{
        index: 1,
        deviceNumber: '井盖1'
      },
      {
        index: 2,
        deviceNumber: '井盖2'
      },
      {
        index: 3,
        deviceNumber: '井盖3'
      },
      {
        index: 4,
        deviceNumber: '井盖4'
      },
      {
        index: 5,
        deviceNumber: '井盖5'
      }
      ],
      top2: [{
        index: 6,
        deviceNumber: '井盖6'
      },
      {
        index: 7,
        deviceNumber: '井盖7'
      },
      {
        index: 8,
        deviceNumber: '井盖8'
      },
      {
        index: 9,
        deviceNumber: '井盖9'
      },
      {
        index: 10,
        deviceNumber: '井盖10'
      }
      ]
    };
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
</style>
