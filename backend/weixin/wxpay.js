var Payment = require('wechat-pay').Payment;
var wxpayconfig = require('./wxpayconfig').wxpayconfig;

/*
 trade_type  ֧������
 body  ��Ʒ����
 attach  ������Ϣ
 out_trade_no ������
 total_fee ��� ��λ��
 spbill_create_ip ip��ַ
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
    //console.log('��ʼ��',initConfig) ;
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
            console.log('����΢��֧���ɹ�', order, err, payargs);
            callback(err, payargs)
        }
        else {
            console.log('����֧������', order, err, payargs);
            callback(err, payargs)
        }
    });
}
exports.weixinorderpayment = weixinorderpayment;