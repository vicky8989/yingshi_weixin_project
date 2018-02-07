//Œ¢–≈÷ß∏∂≈‰÷√  wxpayconfig
var fs = require('fs');

exports.wxpayconfig = {
    partnerKey: "",
    appId:   "wx300122015031b943",
    mchId:  "1488513492",
    notifyUrl: "",
    pfx: fs.readFileSync(process.cwd()+"/cert/apiclient_cert.p12")
}