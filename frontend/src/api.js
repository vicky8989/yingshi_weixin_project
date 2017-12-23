import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Mock from 'mockjs';

Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = HOST_CONFIG;

const PRIZES = 'awards.json';

const RANKING = 'userList.json';

<<<<<<< Updated upstream
const FINSIHTIME = '2017/12/11 17:39:10';
=======
const FINSIHTIME = '2017/12/17 17:39:10';
>>>>>>> Stashed changes

const VueHttp = new Vue();

/*测试的接口*/
const TEST = `${HOST}test`;
const GIFTS = `${HOST}gifts`;
const BANNERS = `${HOST}banners`;
const USERDATA = `${HOST}userData`;

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

// 生成商品列数据
Mock.mock(USERDATA, {
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "voteNum": 12,
    "hot": 12,
    "gift": 12,
    "id": 12,
    "name":'@cword(2,4)',
    "img":'@image(48x48,#50B347,#fff, nice)',
    'words':'@cword(6,10)',
    "pics|3":[{
      'id|+1':1,
      'src':'@image(200x200,#50B347,#fff, nice)'}],
    "gifts|10":[{
      "name":'@cword(2)',
      "text":'@cword(3,5)',
      "time":'2017-11-15',
      "img":'@image(60x60,#50B347,#fff, nice)'
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

//模拟礼物列表数据
Mock.mock(BANNERS, {
  code: 1,
  msg: '查询成功',
  data: {
    "success": 'true',
    "value|3": [{
      'id|+1': 1,
      'src':'@image(200x200,#50B347,#fff, nice)'
    }]
  }
});
// 生成商品列数据
Mock.mock(RANKING, {
        code: 1,
        msg: '查询成功',
        data: {
            'total': 20,
            'records': 10,
            'page': 1,
            'rows|10': [{
                'id|+1': 1,
                'voteNum': '@natural(10, 100)',
                'number': '@natural(1, 100)',
                'name':'@cword(2, 5)',
                'present':'@natural(1, 100)',
                'title': '@ctitle(6,20)',
                'pic': '@image(200x200,#50B347,#fff, nice)'
            }]
        }
});


export default {
	FINSIHTIME,
  getBanners:()=>{
    return VueHttp.$http.get(BANNERS)
  },
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
  getUserDataByID:(jsons)=>{
    return VueHttp.$http.get(USERDATA)
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
