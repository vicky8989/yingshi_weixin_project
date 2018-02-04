var Oauth = function()
{
    //微信认证
    var OAuth = require('wechat-oauth');
    var client = new OAuth('wx300122015031b943', 'e8f5f0568d63516865fcc2dd8cff1830');
    var domain = "http://datongys.cn/vote/";

    this.redirect = function()
    {
        var url = client.getAuthorizeURL(domain, '', 'snsapi_userinfo');
        // 重定向请求到微信服务器
        res.redirect(url);
    }

    this.getAccessToken = function(code,callback)
    {
        client.getAccessToken(code, function (err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }

            var accessToken = result.data.access_token;
            var openid = result.data.openid;

            client.getUser(openid, function (err, result) {

                if(err)
                {
                    console.log('Error:'+ err);
                    return;
                }

                callback(result,openid);
            });
        });
    };


}
        

module.exports = new Oauth();