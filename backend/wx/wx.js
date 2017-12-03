(function() {

// moduls
var https = require('https');
var jsSHA = require('jssha');

var log = require('../log/log');

var appInfo = {};

var wx = function() {
	// 签名缓存
	this.signatureCache = {};

	// 过期时间
	this.expireTime = 7200;

};

/**
 * 获得微信签名的方法
 */
wx.prototype.getSignatureJson = function( queryJson, cb ) {
	var s = this;
	console.log(queryJson);

	appInfo = require('./appInfo');

	var appName = queryJson.appName;

	var url = queryJson.url;

	var errJson = {error:'not have this appName:' + appName};

	var appData = appInfo[appName];

	if (appData == undefined) {
		cb(errJson);
		return;
	};

	var appId = appData.appId;
	var appSecret = appData.appSecret;

	var cacheSignature = s.signatureCache[url];
	var currentTimestamp = createTimestamp();

	var elapse;
	if (cacheSignature) {
		elapse = parseInt(currentTimestamp) - parseInt(cacheSignature.timestamp);
	}
	
	if (cacheSignature != undefined && ( elapse < s.expireTime)) {
		log.setLog('wx.getSignatureJson', 'cache: ' + JSON.stringify(cacheSignature));
		// 调用回调函数
		cb(cacheSignature);
	} else {
		getAccessToken(appId, appSecret, function(data) {
			getTicket(data.access_token, function(res) {
				// nonceStr
				var nonceStr = createNonceStr();
				// timestamp
				var timestamp = createTimestamp();

				// ticket
				var ticket = res.ticket;

				// 计算签名
				var signature = calcSignature(ticket, nonceStr, timestamp, url);

				// 签名数据
				var signatureData = {
					appId:appId,
					nonceStr:nonceStr,
					timestamp:timestamp,
					signature:signature,
					url:url
				};

				// 以些url为吸,将签名数据存入缓存
				s.signatureCache[url] = signatureData;

				log.setLog('wx.getSignatureJson', 'new: ' + JSON.stringify(signatureData));
				// 调用回调函数
				cb(signatureData);
			});
		});
	}
};

// 随机字符串产生函数
var createNonceStr = function() {
	return Math.random().toString(36).substr(2, 15);
};

// 时间戳产生函数
var createTimestamp = function () {
	return parseInt(new Date().getTime() / 1000) + '';
};

// 计算签名
var calcSignature = function (ticket, noncestr, ts, url) {
	var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
	shaObj = new jsSHA(str, 'TEXT');
	return shaObj.getHash('SHA-1', 'HEX');
}

/**
 * 第一步: 使用appId与appSecret或得access_token
 */
var getAccessToken = function( appId, appSecret, cb ) {
	https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appId+'&secret='+appSecret,function(res) {
		var str = '';
		res.on('data',function(data) {
			str += data;
		});
		res.on('end',function() {
			console.log('access_token:' + str);

			try{
				var json = JSON.parse(str);
			} catch(e) {
				console.log('AccessToken Json Parse Error!');
			}

			cb(json);
		});
	});
};

/**
 * 第二步: 使用第一步得到的access_token获得ticket
 */
var getTicket = function( accessToken, cb ) {
	https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+accessToken+'&type=jsapi', function(res) {
		var str = '';
		res.on('data',function(data) {
			str += data;
		});
		res.on('end',function() {
			try {
				var json = JSON.parse(str);
			} catch(e) {
				console.log('Ticket Json Parse Error!');
			}

			cb(json);
		});
	});
};

module.exports = new wx();

}());