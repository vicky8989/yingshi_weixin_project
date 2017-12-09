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

// 生成商品列数据
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

export default {
  getPrizes:()=>{
    return VueHttp.$http.get(prize)
  },
  httpUrl: HOST
}
