// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'n-zepto';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable';
import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

// 引入样式
import 'vue-easytable/libs/themes-base/index.css';
/*import VueResource from 'vue-resource'; //vue-router路由
Vue.use(VueResource)*/
//Vue.config.productionTip = false
import ApiSever from './api.js';


Vue.use(ApiSever);
Vue.prototype.ApiSever=ApiSever;

Vue.use(ElementUI)
// 注册到全局
Vue.component(VTable.name, VTable)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
