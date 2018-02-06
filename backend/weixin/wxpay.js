var Payment = require('wechat-pay').Payment;
var wxpayconfig = require('./wxpayconfig').wxpayconfig;

/*
 trade_type  支付类型
 body  商品描述
 attach  附加信息
 out_trade_no 订单号
 total_fee 金额 单位分
 spbill_create_ip ip地址
 openid openid
 */
function weixinorderpayment(order, callback) {
    var initConfig = {
        partnerKey: wxpayconfig.partnerKey,
        appId: wxpayconfig.appId,
        mchId: wxpayconfig.mchId,
        notifyUrl: wxpayconfig.notifyUrl,
        pfx: wxpayconfig.pfx
    };
    var payment = new Payment(initConfig);
    //console.log('初始化',initConfig) ;
    //var order = {
    //    body: body,
    //    detail: detail,
    //    out_trade_no: '20170331'+Math.random().toString().substr(2, 10),
    //    total_fee: total_fee,
    //    spbill_create_ip: spbill_create_ip,
    //    openid: openid,
        //trade_type: trade_type
    //};
    //console.log('order',JSON.stringify(order)) ;
    payment.getBrandWCPayRequestParams(order, function (err, payargs) {
        if (!err) {
            console.log('发起微信支付成功', order, err, payargs);
            callback(err, payargs)
        }
        else {
            console.log('发起支付出错', order, err, payargs);
            callback(err, payargs)
        }
    });
}
exports.weixinorderpayment = weixinorderpayment;