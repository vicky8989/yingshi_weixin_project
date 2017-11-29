import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = HOST_CONFIG;

const PRIZES = 'awards.json';

const RANKING='userList.json';

const VueHttp = new Vue();

/*测试的接口*/
const TEST = `${HOST}test`;

export default {
	//获取奖品数据
	getPrizes: (jsons) => {
		return VueHttp.$http.get(PRIZES)
	},
	
	getRanking:(jsons)=>{
		return VueHttp.$http.get(RANKING)
	},
	
	getListData: (jsons) => {
		return VueHttp.$http.get(TEST)
	},
	add: (jsons) => {
		return VueHttp.$http.post(TEST,
			qs.stringify(jsons)
		)
	},
	httpUrl: HOST
}