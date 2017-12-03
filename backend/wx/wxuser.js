var https = require('https');
var log = require('../log/log');
var appInfo = require('./appInfo');
var Wxdb = require('./../../js/db/wxdb');
var wxuser = function() {
    this.cache = {};
    this.expireTime = 7200;
};
var wxdb = new Wxdb();

wxuser.prototype.getUserInfo = function(queryJson, cb) {
    var appName = queryJson.appName || 'inno';
    var appData = appInfo[appName];
    var code = queryJson.code;
    var userid = queryJson.userid || '';
    var token;

    // console.log(JSON.stringify(appData));

    var cacheCode = this.cache[code];
    var elapse;
    var currentTimestamp = createTimestamp();

    if (cacheCode) {
        elapse = parseInt(currentTimestamp) - parseInt(cacheCode.timeStamp);
    }
    if (cacheCode && elapse < this.expireTime) {
        _getUserInfo(cacheCode.token, cb);
    } else {
        getToken(appData.appId, appData.appSecret, code, currentTimestamp, function(tokenJson) {
            if (tokenJson.errcode) {
                console.log('ERR: ' + JSON.stringify(tokenJson));
                return;
            }
            _getUserInfo(tokenJson, function(data) {
                data.token = {
                    access_token: tokenJson.access_token,
                    time: currentTimestamp
                };
                data.userid = userid;
                cb(data);
                if (userid == "") {
                    console.log('strat======');
                    wxdb.updateWxUser(data, function(res) {
                        if (!res) {
                            console.log('失败')
                        }else{
                            log.setLog('保存成功');
                        }
                        // log.setLog('OK >' + data.nickname + ' ==========保存成功'+'adasdsa',);
                    });
                } else {
                    wxdb.updateWxUser(data, function(res) {
                        if (!res) {
                            log.setLog('error > 保存用户失败');
                        } else {
                            wxdb.updateFriends(data.openid, userid, function(res) {
                                for(key in res){
                                    console.log(key+":"+res[key]);
                                }
                                
                                if (!res) {
                                    log.setLog('error > 保存好友关系失败');
                                } else {
                                    log.setLog('OK > ' + data.nickname+":("+data.openid+")" + '和' + data.userid + ' 成为好友！');
                                }
                            });
                        }
                    });
                }
            });
        });
    }
};

// 获取用户信息——heter
wxuser.prototype.getUserInfo_heter = function(queryJson, cb) {
    var appName = queryJson.appName || 'inno';
    var userid = queryJson.userid || "";
    var appData = appInfo[appName];
    getAccessToken(appData.appId, appData.appSecret, this.cache, function(token) {
        _getUserInfo(token, function(data) {
            cb(data);
            //保存信息
            if (userid == "") {
                wxdb.updateWxUser(data, function(res) {
                    log.setLog('OK >' + data.nickname + ' 保存成功');
                });
            } else {
                wxdb.updateWxUser(data, function(res) {
                    if (!res) {
                        log.setLog('error > 保存用户失败');
                    } else {
                        wxdb.updateFriends(data.openid, userid, function(res) {
                            if (!res) {
                                log.setLog('error > 保存好友关系失败');
                            } else {
                                log.setLog('OK > ' + data.nickname + '和' + result[0].nickname + ' 成为好友！');
                            }
                        });
                    }
                });
            }
        });
    });
};



// 获取公众号所有用户Openid
wxuser.prototype.getAllUserOpenID = function(queryJson, cb) {
    var appName = queryJson.appName || 'inno';
    var nextOpenid = queryJson.next_openid || "";
    var appData = appInfo[appName];
    getAccessToken(appData.appId, appData.appSecret, this.cache, function(token) {
        _getAllUserOpenID(token, nextOpenid, cb);
    });
};



////////////////////////////////////////////==========================微信公众号API========================
//以Token 为key存储
var getAccessToken = function(appId, appSecret, cache, cb) {
    var currentTimestamp = createTimestamp();

    var cacheToken = cache.token;
    if (cacheToken) {
        var elapse = parseInt(currentTimestamp) - parseInt(cacheToken.timeStamp);
        if (elapse < 7200) {
            console.log(cacheToken.token);
            console.log(cacheToken.timeStamp, elapse);
            cb(cacheToken.token);
        } else {
            cacheToken.token = {};
            getTokenCode(appId, appSecret, cache, cb);
        }
    } else {
        getTokenCode(appId, appSecret, cache, cb);
    }
};


var getTokenCode = function(appId, appSecret, cache, cb) {
        https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSecret, function(res) {
            var str = '';
            res.on('data', function(data) {
                str += data;
            });
            res.on('end', function() {
                console.log('access_token:' + str);

                try {
                    var json = JSON.parse(str);
                } catch (e) {
                    console.log('AccessToken Json Parse Error!');
                }
                cache.token = {
                    timeStamp: createTimestamp(),
                    token: json
                }
                cb(json);
            });
        });
    }
    // 时间戳产生函数
var createTimestamp = function() {
    return parseInt(new Date().getTime() / 1000) + '';
};

var getToken = function(appId, appSecret, code, timeStamp, cb) {
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + appSecret + '&code=' + code + '&grant_type=authorization_code';
    var json;
    https.get(url, function(res) {
        var str = '';
        res.on('data', function(data) {
            str += data;
        });
        res.on('end', function() {
            log.setLog('wxuser>getToken:', str);
            try {
                json = JSON.parse(str);
            } catch (e) {
                console.log('user openId Json Parse Error!')
            }

            // to cache  // ** donot cache yet because is to many people
            // this.cache[code] = {
            //     timeStamp: timeStamp,
            //     token: json
            // }

            cb(json);
        });
    });
};

var _getUserInfo = function(tokenJson, cb) {

    var url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + tokenJson.access_token + '&openid=' + tokenJson.openid;
    var json;
    https.get(url, function(res) {
        var str = '';
        res.on('data', function(data) {
            str += data;
        });
        res.on('end', function() {
            log.setLog('wxuser>_getUserInfo:', str);
            try {
                json = JSON.parse(str);
            } catch (e) {
                console.log('user info Json Parse Error!')
            }

            cb(json);
        });
    });
};
//获取公众号所有用户Openid
var _getAllUserOpenID = function(tokenJson, nextOpenid, cb) {
    // https: //api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
    var url = 'https://api.weixin.qq.com/cgi-bin/user/get?access_token=' + tokenJson.access_token + '&next_openid=' + nextOpenid;
    var json;
    https.get(url, function(res) {
        var str = '';
        res.on('data', function(data) {
            str += data;
        });
        res.on('end', function() {
            log.setLog('wxuser>_getUserAllInfo:', tokenJson.access_token, str);
            try {
                json = JSON.parse(str);
            } catch (e) {
                console.log('user info Json Parse Error!')
            }

            cb(json);
        });
    });
};

// var url     = queryJson.url;
//     var dbname  = queryJson.db || '';
//     var coll    = queryJson.coll;
//     var method  = queryJson.method; // insert | remove | update | find
//     var query   = queryJson.query ? JSON.parse(queryJson.query) : {};
//     var data    = queryJson.data ? JSON.parse(queryJson.data) : {};
//     var options = queryJson.options ? JSON.parse(queryJson.options) : null; 
///////////////////////////////////====================mongoDB===========================

module.exports = new wxuser();