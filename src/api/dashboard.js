import request from '@/utils/request';

/////////////综合概况/////////////////

// 井盖日告警趋势 1-正常井 2- 污水井 3- 雨水井
export function dailyAlarm (data) {
  return  request({
    url:`/summary/dailyAlarm/${data}`,
    method: 'post',
    data
  })
}

/////////////综合概况/////////////////
