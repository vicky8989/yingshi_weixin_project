import Vue from 'vue'
//import axios from 'axios'
//import qs from 'qs'

//Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = HOST_CONFIG;

const VueHttp = new Vue();

/*测试的接口*/
const TEST = `${HOST}test`;

export default {
	getListData: (jsons) => {
		console.log('传的参数',jsons);
		return VueHttp.$http.get(TEST,
			//			qs.stringify(jsons)
		)
	},
	httpUrl: HOST
}