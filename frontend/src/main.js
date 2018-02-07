import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
import $ from 'n-zepto';
//import router from './router'
import routerConfig from './router/router'
import Router from 'vue-router'
Vue.use(Vuex)
Vue.use(Router);
import VueResource from 'vue-resource'; //vue-router路由
Vue.use(VueResource)
Vue.config.productionTip = false

import ApiSever from './api.js';

import utils from './utils.js'
Vue.prototype.$utils = utils;

import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', {
	value: moment
});

Vue.use(ApiSever);
Vue.prototype.ApiSever = ApiSever;

const Store = new Vuex.Store({
	state: {
		conutDown: '',
		//wxUser:null, //正式环境
		//test
		wxUser:{
			openid:'o933-1W4cdVDN25_e2JWKGOFeg_a',
//			nikename:'文姬',
			nikename:null,
			headimgurl:"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoDGe7wXlOa1mxspKHy64ZLmq0zNPbpqibxmEFoUTS2mrhgR8hiagCibdoyq90ib6NWKqzUlvFmzZDBrQ/132",
			language:'zh_CN'
		}
	},
	mutations: {
		checkToken(state, data) {
			state.silderNav = data.silderNav;
		},
		timeChanged(state) {
			ApiSever.getActivity().then(res => {
				if(res && res.data && res.data.length > 0) {
					let result = res.data[0];
					state.conutDown = result.voteend;
				}
			});
		},
	    setWeixinUser(state,info) {
	        state.wxUser = info;
	    }
	},
	actions: {
		finishtimeChanged(context) {
			context.commit("timeChanged");
		},
	    setWeixinUserInfo(context,info) {
	      context.commit("setWeixinUser",info)
	    }
	}
});

Vue.prototype.successLoadImg = function(event) {
	if(event.target.complete == true) {
		var imgParentNode = event.target.parentNode;
		imgParentNode.classList.add("bg_cover");
		event.target.style.display = "none";
	}
};
Vue.prototype.errorLoadImg = function(event) {
	var imgParentNode = event.target.parentNode;
	imgParentNode.classList.remove("bg_cover");
	imgParentNode.classList.add('errorLoadImgbg_cover');
	event.target.style.display = "none";
};

//路由
const router = new Router({
  //hashbang: true,
  //history: false,
  mode: 'history',
  base:'/vote',
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass: 'aui-active',
  routes :routerConfig// （缩写）相当于 routes: routes
});
//路由控制
router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0);
	next()
});
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store: Store,
	template: '<App/>',
	components: {
		App
	}
})