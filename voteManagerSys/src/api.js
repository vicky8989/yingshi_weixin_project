import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Mock from 'mockjs';

Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = HOST_CONFIG;

const VueHttp = new Vue();

/*测试的接口*/
const prize = `${HOST}prize`;
const activeList = `${HOST}listActivities`;
const voterList =`${HOST}getVoter`;
const paticilist=`${HOST}getPaticilist`;
const signerList =`${HOST}getSignerlist`;

// 生成奖品列数据
Mock.mock(prize, {
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "pageSize": 3,
    "count": 30,
    "value|3": [{
      'id|+1': 1,
      'prizeCount': '@natural(10, 100)',
      'rankname': '@ctitle(6, 20)',
      'prizename': '@ctitle(6, 20)',
      'prizeimg': '@image(200x200,#50B347,#fff, nice)'
    }]
  }
});

// 生成奖品列数据
// Mock.mock(activeList, {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     "success": 'true',
//     "pageSize": 1,
//     "count": 1,
//     "value|2": [{
//       'id|+1': 1,
//       'name': '@ctitle(10, 15)',
//       'reName': '@ctitle(6, 20)',
//       'starttime': "@date('yyyy-MM-dd')",
//       'endtime': "@date('yyyy-MM-dd')",
//       'votestarttime': "@date('yyyy-MM-dd')",
//       'voteendtime': "@date('yyyy-MM-dd')",
//       'status': '1'
//     }]
//   }
// });

Mock.mock(voterList,{
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "pageSize": 1,
    "count": 1,
    "value|2": [{
      'id|+1': 1,
      'name': '@ctitle(10, 15)',
      'votename': '@ctitle(6, 20)',
      'tel':'13455673452',
      'num': "100",
      'curnum':"11",
      'lasttime': "@date('yyyy-MM-dd')"
    }]
  }
});

Mock.mock(paticilist,{
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "pageSize": 1,
    "count": 1,
    "value|2": [{
      'id|+1': 1,
      'name': '@ctitle(10, 15)',
      'parName': '@ctitle(6, 10)',
      'votenum':'123',
      'voteno':'no.123',
      'giftnum':'10',
      'money':'200',
      'status':'1'
    }]
  }
});

Mock.mock(signerList,{
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "pageSize": 1,
    "count": 1,
    "value|5": [{
      'id|+1': 1,
      'name': '@ctitle(10, 15)',
      'imgPath': '@ctitle(6, 10)',
      'tel':'12345567889',
      'uploadtime':"@date('yyyy-MM-dd')",
      'status':'1'
    }]
  }
});

export default {
  getPrizes:()=>{
    return VueHttp.$http.get(prize)
  },
  getActivities:()=>{
    return VueHttp.$http.get(activeList)
  },
  getVoterList:()=>{
    return VueHttp.$http.get(voterList)
  },
  getPaticitesList:()=>{
    return VueHttp.$http.get(paticilist)
  },
  getSignerList:()=>{
    return VueHttp.$http.get(signerList);
  },
  httpUrl: HOST
}
