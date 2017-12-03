var jsonpMongoLocal = require('./jsonpMongoLocal');
var wxdb = function() {
    this.updateWxUser = function(userData, cb) {
        var queryJson = {
            url:'mongodb://inno:dong@127.0.0.1:27017/',
            db: 'xmas',
            coll: 'wxusers',
            method: 'update',
            data: {
                $set: {
                    'openid': userData.openid,
                    'nickname': userData.nickname,
                    'headimgurl': userData.headimgurl ,
                    "sex": userData.sex,
                    "language": userData.language,
                    "city": userData.city,
                    "province": userData.province,
                    "country": userData.country
                },
                $addToSet: {
                    "projectName": 'inno',
                    "friends": userData.userid
                }
            },
            query: {
                'openid': userData.openid
            }
        };
        console.log(queryJson);
        jsonpMongoLocal.analyse(queryJson, cb);

    };

    this.updateFriends = function(_openId, friendId, cb) {
        var mongoData = {
            url: 'mongodb://inno:dong@127.0.0.1:27017/',
            db: 'xmas',
            coll: 'wxusers',
            method: 'update',
            data: {
                $addToSet: {
                    "friends": friendId
                }
            },
            query: {
                openid: _openId
            }
        };
        jsonpMongoLocal.analyse(mongoData, function(res) {
            mongoData.query = {
                openid: friendId
            };
            mongoData.data = {
                $addToSet: {
                    "friends": _openId
                }
            };
            jsonpMongoLocal.analyse(mongoData, cb);
        });
    };
    this.findWxUser = function(_openid, cb) {
        var mongoData = {
            url: 'mongodb://inno:dong@127.0.0.1:27017/',
            db: 'xmas',
            coll: 'wxusers',
            method: 'find',
            query: {
                openid: _openid
            },
            options: {
                _id: 0
            }
        };
        jsonpMongoLocal.analyse(mongoData, cb);
    };
};
module.exports = wxdb;