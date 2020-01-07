import request from '@/utils/request';

export function dailyAlarm(data) {
  return request({
    url: `/wellcover/dailyAlarm`,
    method: 'post',
    data
  });
}
