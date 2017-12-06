import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

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
Vue.prototype.errorMInLoadImg = function(event) {
	var imgParentNode = event.target.parentNode;
	imgParentNode.classList.remove("bg_cover");
	imgParentNode.classList.add('errorMinLoadImgbg_cover');
	event.target.style.display = "none";
};

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');