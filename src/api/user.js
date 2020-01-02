import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  });
}

export function getInfo(token) {
  return request({
    url: '/user/getUserByToken',
    method: 'post',
    params: { token }
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
