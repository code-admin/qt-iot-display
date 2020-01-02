import request from '@/utils/request';

/////////////综合概况-START/////////////////

// 井盖日告警趋势 1-正常井 2- 污水井 3- 雨水井
export function dailyAlarm (deviceModel) {
  return  request({
    url: `/summary/dailyAlarm/${deviceModel}`,
    method: 'post'
  })
}

//  设备告警百分比统计 1-正常井 2- 污水井 3- 雨水井
export function getAlarm (deviceModel) {
  return  request({
    url: `/summary/getAlarm/${deviceModel}`,
    method: 'post'
  })
}

//  设备告警百分比统计 1-正常井 2- 污水井 3- 雨水井
export function getAlarmList (data) {
  return  request({
    url:`/summary/getAlarmList`,
    method: 'post',
    data
  })
}

//  根据设备Id获取设备详情
export function getDeviceById (deviceId) {
  return  request({
    url: `/summary/getDeviceById/${deviceId}`,
    method: 'post'
  })
}

//  获取设备分布
export function getDeviceMap (data) {
  return  request({
    url: `/summary/getDeviceMap`,
    method: 'post',
    data
  })
}


//  设备类型占比情况 1-正常井 2- 污水井 3- 雨水井
export function getDeviceModels (data) {
  return  request({
    url: `/summary/getDeviceModels`,
    method: 'post',
    data
  })
}

//  设备总数、在线数、告警数、以及天气参数
export function getTotalDevices (data) {
  return  request({
    url: `/summary/getTotalDevices`,
    method: 'post',
    data
  })
}


// 污水井水位变化 1-正常井 2- 污水井 3- 雨水井
export function getWaterLevel (deviceModel) {
  return  request({
    url: `/summary/getWaterLevel/${deviceModel}`,
    method: 'post'
  })
}

// 污水井水质参数
export function waterQuality (data) {
  return  request(
    {
      url: `/summary/waterQuality`,
      method: 'post',
      data
    }
  )
}

/////////////综合概况-END/////////////////
