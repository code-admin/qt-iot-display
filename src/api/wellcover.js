import request from '@/utils/request';

export function dailyAlarm(data) {
  return request({
    url: `/wellcover/dailyAlarm`,
    method: 'post',
    data
  });
}

export function getWellCoverStatus() {
  return request({
    url: `/wellcover/getWellCoverStatus`,
    method: 'post'
  });
}

export function top10AlarmDevice() {
  return request({
    url: `/wellcover/top10AlarmDevice`,
    method: 'post'
  });
}

