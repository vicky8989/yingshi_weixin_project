// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('./assets/css/aui.2.0.css');
require('./assets/css/aui-slide.css');
require('./assets/css/iconfont.css');
//require("./assets/css/main.less");
require('./assets/css/blue.less');
require('./assets/lib/rem');
require('./assets/lib/aui-slide');

import Vue from 'vue'
import App from './App'
import $ from 'n-zepto';
//import router from './router'
import routerConfig from './router/router'
import Router from 'vue-router'
Vue.use(Router)
import VueResource from 'vue-resource'; //vue-router路由
Vue.use(VueResource)
Vue.config.productionTip = false
import ApiSever from './api.js';


Vue.use(ApiSever);
Vue.prototype.ApiSever=ApiSever;



//路由
const router = new Router({
  hashbang: true,
  history: false,
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
  template: '<App/>',
  components: { App }
})
