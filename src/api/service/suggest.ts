/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import http from '@/utils/http/axios';

//获取table
export function sendUserSuggest(params: any) {
  return http.request(
    {
      url: '/feedback/add',
      method: 'post',
      params
    },
    {
      isShowMessage: true
    }
  );
}

// 获取 APP端 意见来源字典列表
export function getSuggestDict(params: any) {
  return http.request({
    url: '/dict/filterList',
    method: 'post',
    params
  });
}
