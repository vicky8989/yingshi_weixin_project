import Vue from 'vue'

Vue.filter("reviewStatus", function(value) {

	if(value) {
		let resource='';
		switch(Number(value)){
			case 1:
			resource='审核通过';
			break;
			case 0:
			resource='审核不通过';
			break;
			default:
			break;
		}
		return resource;
	}
});
