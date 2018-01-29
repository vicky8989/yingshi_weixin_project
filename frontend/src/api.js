import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Mock from 'mockjs';

Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = HOST_CONFIG;

const PRIZES = 'awards.json';

const RANKING = 'userList.json';

let FINSIHTIME = '2018/12/29 17:39:10';
let AID = null;
const PERPAGENUM = 3; //首页显示几条作品

const VueHttp = new Vue();

//一定要设置，否则post,put不成功
VueHttp.$http.options.emulateJSON = true;
VueHttp.$http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

const ACTIVITY = `${HOST}getActivities?status=1`;
const ADDSIGNER = `${HOST}addSigner`;
const GETSIGNERS = `${HOST}getSigners`;
const GETSIGNERBYID = `${HOST}getSigner`;
const UPDATESIGNER = `${HOST}updateSigner`;
const GETUSER = `${HOST}getUser`;
const ADD_USER_INFO = `${HOST}addOrUpdateUser`;  //添加微信用户
const UPDATE_USER_INFO = `${HOST}addOrUpdateUser`; //更新微信用户
const GETAWARDS = `${HOST}getAwards`;
const GETPRESENTNUM = `${HOST}getPresentsTotal`; //获得某人得到的礼物总数
const GETPRESENTINFO = `${HOST}getPresentsDetail`; //获得某人得到的礼物总数
const ADDPRESENT = `${HOST}addPresent`;
const LISTGIFTS = `${HOST}listGifts`;

/*测试的接口*/
const TEST = `${HOST}test`;
const GIFTS = `${HOST}gifts`;
//const BANNERS = `${HOST}banners`;
const USERDATA = `${HOST}userData`;
const delActivityImg = `${HOST}deleteActivityImage`;

const OAUTH = `${HOST}oauth`;
const GET_WX_USER = `${HOST}oauthcallback`;

//微信接口
const appID = 'wx0ef959f2d341d916';
//const weixin_login = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=http://192.168.1.6/vote/index&response_type=code&scope=snsapi_userinfo&state=234#wechat_redirect`;
var weixin_code = null;

// 生成商品列数据
// Mock.mock(TEST, {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     "success": 'true',
//     "pageSize": 3,
//     "count": 30,
//     "value|10": [{
//       'id|+1': 1,
//       'num': '@natural(10, 100)',
//       'name': '@title(6, 20)',
//       'src': '@image(200x200,#50B347,#fff, nice)'
//     }]
//   }
// });

// 生成商品列数据
// Mock.mock(USERDATA, {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     "success": 'true',
//     "voteNum": 12,
//     "hot": 12,
//     "gift": 12,
//     "id": 12,
//     "name":'@cword(2,4)',
//     "img":'@image(48x48,#50B347,#fff, nice)',
//     'words':'@cword(6,10)',
//     "pics|3":[{
//       'id|+1':1,
//       'src':'@image(200x200,#50B347,#fff, nice)'}],
//     "gifts|10":[{
//       "name":'@cword(2)',
//       "text":'@cword(3,5)',
//       "time":'2017-11-15',
//       "img":'@image(60x60,#50B347,#fff, nice)'
//     }]
//   }
// });

//模拟礼物列表数据
// Mock.mock(GIFTS, {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     "success": 'true',
//     "value|6": [{
//       'id|+1': 1,
//       'num': '@natural(1, 100)',
//       'name': '@cword(2)'
//     }]
//   }
// });
// 生成商品列数据
// Mock.mock('awards.json', {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     'total': 20,
//     'records': 10,
//     'page': 1,
//     'rows|3': [{
//       'id|+1': 1,
//       'name': '@cword(3, 20)',
//       "number": '@natural(1, 100)',
//       'details|1-10': [{
//         "name": "@cword(3, 4)",
//         "subname": "@cword(6, 10)"
//       }]
//     }]
//   }
// });

//模拟礼物列表数据
// Mock.mock(BANNERS, {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     "success": 'true',
//     "value|3": [{
//       'id|+1': 1,
//       'src':'@image(200x200,#50B347,#fff, nice)'
//     }]
//   }
// });
// // 生成商品列数据
// Mock.mock(RANKING, {
//         code: 1,
//         msg: '查询成功',
//         data: {
//             'total': 20,
//             'records': 10,
//             'page': 1,
//             'rows|10': [{
//                 'id|+1': 1,
//                 'voteNum': '@natural(10, 100)',
//                 'number': '@natural(1, 100)',
//                 'name':'@cword(2, 5)',
//                 'present':'@natural(1, 100)',
//                 'title': '@ctitle(6,20)',
//                 'pic': '@image(200x200,#50B347,#fff, nice)'
//             }]
//         }
// });

function validTimeFinished(finishTime) {
  let curTime_ = (new Date(finishTime)).getTime() / 1000 - (new Date()).getTime() / 1000;

  if (curTime_ < 0) {
    return true;
  } else {
    return false;
  }
}


export default {
  FINSIHTIME,
  AID,
  PERPAGENUM,
  // weixin_login,
  weixin_code,
  OAUTH,
  getWxUserInfo: (code) => {
    let url = GET_WX_USER + '?code=' + code;
    return VueHttp.$http.get(url);
  },
  getActivity: () => {
    return VueHttp.$http.get(ACTIVITY)
  },
  addRecruit: (data) => {
    return VueHttp.$http.post(ADDSIGNER, data)
  },
  //获取奖品数据
  getPrizes: (aid) => {
    let url = `${GETAWARDS}?aid=${aid}`;
    return VueHttp.$http.get(url)
  },

  getRanking: (aid) => {
    let url = `${GETAWARDS}?aid=${aid}`;
    return VueHttp.$http.get(RANKING)
  },
  delActivityImg: (filename) => {
    let delImgUrl = `${delActivityImg}?image=${filename}`;
    return VueHttp.$http.delete(delImgUrl);
  },
  //根据活动获取
  getListSigners: (aid) => {
    let url = `${GETSIGNERS}?aid=${aid}`;
    return VueHttp.$http.get(url)
  },
  addUserInfo: (data) => {
    return VueHttp.$http.post(ADD_USER_INFO, data);
  },
  updateUserInfo: (openid, data) => {
    let url = `${UPDATE_USER_INFO}?openid=${openid}`;
    return VueHttp.$http.post(url, data);
  },
  getUserInfo: (openid) => {
    let url = `${GETUSER}?openid=${openid}`;
    return VueHttp.$http.get(url)
  },
  getPresentsTotal: (sid) => {
    let url = `${GETPRESENTNUM}?sid=${sid}`;
    return VueHttp.$http.get(url)
  },
  getPresentsDetail: (sid) => {
    let url = `${GETPRESENTINFO}?sid=${sid}`;
    return VueHttp.$http.get(url);
  },
  addPresentDetail: (data) => {
    return VueHttp.$http.post(ADDPRESENT, data);
  },
  getUserDataByID: (sid) => {
    let url = `${GETSIGNERBYID}?sid=${sid}`;
    return VueHttp.$http.get(url)
  },
  updateSinger: (sid, data) => {
    let url = `${UPDATESIGNER}?sid=${sid}`;
    return VueHttp.$http.put(url, data);
  },
  getGiftsList: (jsons) => {
    return VueHttp.$http.get(LISTGIFTS)
  },
  add: (jsons) => {
    return VueHttp.$http.post(TEST, jsons)
  },
  getFinishTime: (time) => {
    if (!time) time = FINSIHTIME;
    return validTimeFinished(time);
  },
  httpUrl: HOST,
  imgUrl: `${HOST}images/`,
  uploadUrl: `${HOST}uploadActivityImage`
}
