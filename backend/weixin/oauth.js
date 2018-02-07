var express = require('express');
var router = express.Router();

var OAuth = require('wechat-oauth');
var client = new OAuth('wx0ef959f2d341d916', 'd9df5debf4e37def18cc5e37326b604e');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var domain = "https://192.168.1.6"
    var auth_callback_url = domain + "/oauth/callback"
    var url = client.getAuthorizeURL(auth_callback_url, '', 'snsapi_userinfo');
    console.log(url);
    // 重定向请求到微信服务器
    res.redirect(url);
});

router.get('/callback', function (req, res, next) {
    var code = req.query.code;
    client.getAccessToken(code, function (err, result) {
        console.log(result)
        var accessToken = result.data.access_token;
        var openid = result.data.openid;

        client.getUser(openid, function (err, result) {
            var userInfo = result;
            // save or other opration
            res.json(userInfo)
			console.log(userInfo);
        });
    });
});

module.exports = router;