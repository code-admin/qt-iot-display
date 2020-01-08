import request from '@/utils/request';

// 污水监测
export function getCodList(data) {
  return request(
    {
      url: `/waterQuality/getCodList`,
      method: 'post',
      data
    }
  );
}

// 水质监测
export function getPHList(data) {
  return request(
    {
      url: `/waterQuality/getPHList`,
      method: 'post',
      data
    }
  );
}

// 实时告警信息
export function getAlarmList(data) {
  return request(
    {
      url: `/waterQuality/getAlarmList`,
      method: 'post',
      data
    }
  );
}

// 告警趋势
export function getAlarmChange(data) {
  return request(
    {
      url: `/waterQuality/getAlarmChange`,
      method: 'post',
      data
    }
  );
}

// 雨污告警状况
export function getAlarmPercentage(data) {
  return request(
    {
      url: `/waterQuality/getAlarmPercentage`,
      method: 'post',
      data
    }
  );
}

