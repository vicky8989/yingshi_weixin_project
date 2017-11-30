import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Mock from 'mockjs';

Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = HOST_CONFIG;

const PRIZES = 'awards.json';

const RANKING = 'userList.json';

const VueHttp = new Vue();

/*测试的接口*/
const TEST = `${HOST}test`;
const GIFTS = `${HOST}gifts`;

// 生成商品列数据
Mock.mock(TEST, {
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "pageSize": 3,
    "count": 30,
    "value|10": [{
      'id|+1': 1,
      'num': '@natural(10, 100)',
      'name': '@title(6, 20)',
      'src': '@image(200x200,#50B347,#fff, nice)'
    }]
  }
});

//模拟礼物列表数据
Mock.mock(GIFTS, {
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "value|6": [{
      'id|+1': 1,
      'num': '@natural(1, 100)',
      'name': '@cword(2)'
    }]
  }
});

// 生成商品列数据
Mock.mock('awards.json', {
  code: 1,
  msg: '查询成功',
  data: {
    'total': 20,
    'records': 10,
    'page': 1,
    'rows|3': [{
      'id|+1': 1,
      'name': '@cword(3, 20)',
      "number": '@natural(1, 100)',
      'details|1-10': [{
        "name": "@cword(3, 4)",
        "subname": "@cword(6, 10)"
      }]
    }]
  }
});


export default {
  //获取奖品数据
  getPrizes: (jsons) => {
    return VueHttp.$http.get(PRIZES)
  },

  getRanking: (jsons) => {
    return VueHttp.$http.get(RANKING)
  },

  getListData: (jsons) => {
    return VueHttp.$http.get(TEST)
  },
  getGiftsList: (jsons) => {
    return VueHttp.$http.get(GIFTS)
  },
  add: (jsons) => {
    return VueHttp.$http.post(TEST,
      qs.stringify(jsons)
    )
  },
  httpUrl: HOST
}
