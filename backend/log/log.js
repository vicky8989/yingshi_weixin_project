
/**
 * Log
 */

Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 

var Log = function() {
	this.log = [];
};

Log.prototype.setLog = function(type, content) {
	this.log.splice(0, 0, this.getLogString(type, content));
	if (this.log.length > 200) {
		this.log = this.log.slice(0, 100);
	}
};

Log.prototype.getLogString = function(type, content) {
	var now = new Date();
	var s = new Date(now.getTime() + 12 * 60 * 60 * 1000).format('yyyy-MM-dd hh:mm:ss');
	s += ' ' + type + ' : ';
	s += content;
	return s;
};

Log.prototype.clear = function() {
	this.log = [];
	this.log = this.setLog('log', 'clear');
};

Log.prototype.toString = function() {
	var str = '';
	for (var i = 0; i < this.log.length; i++) {
		str += this.log[i];
		str += '\n';
	}
	return str;
};

var _log = new Log();
module.exports = (function() {
	return _log;
})();



