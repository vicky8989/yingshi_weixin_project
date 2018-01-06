import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Mock from 'mockjs';

Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = HOST_CONFIG;

const VueHttp = new Vue();

VueHttp.$http.options.emulateJSON = true;

/*奖品接口*/
const prize = `${HOST}getAwards`;
const updatePrize = `${HOST}updateAward`;
const delPrize = `${HOST}deleteAward`;
const addPrize = `${HOST}addAward `;

const activeList = `${HOST}listActivities`;
const activityInfo = `${HOST}getActivity`;
const updateActivityInfo = `${HOST}updateActivity`;
const addActivity = `${HOST}addActivity`;
const voterList = `${HOST}getVoter`;
const paticilist = `${HOST}getSigners`;
const GETPRESENTINFO = `${HOST}getPresentsDetail`; //获得某人得到的礼物总数
const UPDATESIGNER = `${HOST}updateSigner`;
const GIFTMONEY = `${HOST}getPrize`;
const UPDATEMONEY = `${HOST}updatePrize`;
const LISTGIFTS = `${HOST}listGifts`;
const UPDATEGIFT = `${HOST}updateGift`;
const ADDGIFT = `${HOST}addGift`;
const DELGIFT = `${HOST}deleteGift`;

/*用户接口*/
const signerList = `${HOST}listUsers`;
const delActivityImg = `${HOST}deleteActivityImage`;

Mock.mock(voterList, {
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
      'tel': '13455673452',
      'num': "100",
      'curnum': "11",
      'lasttime': "@date('yyyy-MM-dd')"
    }]
  }
});

// Mock.mock(paticilist, {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     "success": 'true',
//     "pageSize": 1,
//     "count": 1,
//     "value|2": [{
//       'id|+1': 1,
//       'name': '@ctitle(10, 15)',
//       'parName': '@ctitle(6, 10)',
//       'votenum': '123',
//       'voteno': 'no.123',
//       'giftnum': '10',
//       'money': '200',
//       'status': '1'
//     }]
//   }
// });

// Mock.mock(signerList, {
//   code: 1,
//   msg: '查询成功',
//   data: {
//     "success": 'true',
//     "pageSize": 1,
//     "count": 1,
//     "value|5": [{
//       'id|+1': 1,
//       'name': '@ctitle(10, 15)',
//       'imgPath': '@ctitle(6, 10)',
//       'tel': '12345567889',
//       'uploadtime': "@date('yyyy-MM-dd')",
//       'status': '1'
//     }]
//   }
// });

/*function axiosRequest(method, url, data) {
  if (data) {
    return VueHttp.$http({
      method: method,
      url: url,
      data: {
        param: data
      },
      withCredentials:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  } else {
    return VueHttp.$http({
      method: method,
      url: url,
      withCredentials:true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  }
}*/

export default {
  //参与者列表
  getUser:() => {
    return VueHttp.$http.get(getUser);
  },
  getActivities: () => {
    return VueHttp.$http.get(activeList)
  },
  //根据某一个aid请求活动详情
  getActivityInfo: (id) => {
    let getInfoUrl = `${activityInfo}?aid=${id}`;
    return VueHttp.$http.get(getInfoUrl);
  },
  updateActivityInfo: (data) => {
    return VueHttp.$http.put(updateActivityInfo, JSON.stringify(data));
  },
  addActivityInfo:(data)=> {
    return VueHttp.$http.post(addActivity, JSON.stringify(data));
  },

  //获取奖品
  getPrizes: (aid) => {
    let prizelistUrl = `${prize}?aid=${aid}`;
    return VueHttp.$http.get(prizelistUrl)
  },
  //修改奖品
  updatePrize: (data) => {
    return VueHttp.$http.put(updatePrize, JSON.stringify(data));
  },
  //删除奖品
  delPrize: (id) => {
    let url = `${delPrize}?awid=${id}`;
    return VueHttp.$http.delete(url);
  },

  addPrize: (data) => {
    return VueHttp.$http.post(addPrize, JSON.stringify(data));
  },
  //删除活动某一个照片
  delActivityImg: (filename) => {
    let delImgUrl = `${delActivityImg}?image=${filename}`;
    return VueHttp.$http.delete('delete', delImgUrl);
  },


  getVoterList: () => {
    return VueHttp.$http.get(voterList)
  },

  //获得参与者信息
  getPaticitesList: (aid) => {
    let url = `${paticilist}?aid=${aid}`;
    return VueHttp.$http.get(url)
  },
  getPresentsDetail:(sid)=> {
    let url = `${GETPRESENTINFO}?sid=${sid}`;
    return VueHttp.$http.get(url);
  },
  updateSinger:(sid,data) => {
      let url = `${UPDATESIGNER}?sid=${sid}`;
      return VueHttp.$http.put(url,JSON.stringify(data));
  },
  getPresentList:() => {
    return VueHttp.$http.get(LISTGIFTS);
  },
  addPresent:(data)=> {
    return VueHttp.$http.post(ADDGIFT,JSON.stringify(data))
  },
  updatePresent:(data)=> {
    let url = `${UPDATEGIFT}?gid=${data._id}`;
    return VueHttp.$http.put(url,JSON.stringify(data))
  },
  delPresent:(id)=> {
    let url = `${DELGIFT}?gid=${id}`;
    return VueHttp.$http.delete(url)
  },
  getMoney:()=> {
    return VueHttp.$http.get(GIFTMONEY);
  },
  updateMoney:(prize) => {
    return VueHttp.$http.put(UPDATEMONEY,JSON.stringify(prize))
  },
  httpUrl: HOST,
  imgUrl: `${HOST}images/`,
  uploadUrl: `${HOST}uploadActivityImage`
}
