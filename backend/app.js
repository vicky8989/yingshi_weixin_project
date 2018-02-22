var express = require('express');
var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');

var dbLink = require('./db/dbLink');
dbLink.link();

var voteUser = require('./db/user');
var voteActivity = require('./db/activity');
var voteSigner = require('./db/signer');
var voteAward = require('./db/award');
var voteGift = require('./db/gift');
var votePresent = require('./db/present');
var voteSetting = require('./db/setting');
var voter = require('./db/voter');
var admin = require('./db/admin');

var file = require('./file/file');

var app = express();
var upload = file.uploadFile();

//微信认证
var OAuth = require('wechat-oauth');
var client = new OAuth('wx300122015031b943', 'e8f5f0568d63516865fcc2dd8cff1830');

//微信支付
var wxpay = require('./weixin/wxpay');

app.use(express.static(file.getImageUrlPath()));
app.use(bodyParser.json({limit: '1000kb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else  next();
});

//测试连接接口
app.get('/test', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.status(200).send({'sucess':"Connect"});
})

//图片接口
app.post('/uploadActivityImage', upload.single('image'), function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.send(req.file);
})

app.post('/uploadActivityImages', upload.array('images',3), function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.send(req.files);
})

app.get('/getActivityImage', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.image==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	var content = file.readFile(params.image);
   	if (content) {
        res.write(content,"binary"); //格式必须为 binary，否则会出错
        res.end();
    }
})

app.delete('/deleteActivityImage', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.image==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	file.deleteFile(params.image,function(result){
      	res.send(result);
  	});
})

//用户接口
app.get('/listUsers', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteUser.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getUser', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.openid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteUser.queryData(params.openid,function(result){
        res.send(result);
    });
})

app.post('/addOrUpdateUser', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');

	var params = url.parse(req.url, true).query;
	if (req.body==null || params.openid==null || params.openid=="") {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteUser.addOrUpdateData(params.openid,req.body,function(result,openid){
      	res.send(openid);
  	});
})

app.delete('/deleteUser', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.openid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteUser.delData(params.openid,function(result){
      	res.send(result);
  	});
})

//活动接口
app.get('/listActivities', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteActivity.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getActivities', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.status==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteActivity.queryDataByStatus(parseInt(params.status),function(result){
        res.send(result);
    });
})

app.get('/getActivity', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteActivity.queryData(params.aid,function(result){
        res.send(result);
    });
})

app.post('/addActivity', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteActivity.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateActivity', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteActivity.updateData(params.aid,req.body,function(result){
      	res.send(result);
  	});
})

app.put('/updateActivityPV', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteActivity.updateDataPV(params.aid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteActivity', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteActivity.delData(params.aid,function(result){
      	res.send(result);
  	});
})

//参赛接口
app.get('/listSigners', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteSigner.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getSigners', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteSigner.queryDataByAid(params.aid,function(result){
        res.send(result);
    });
})

app.get('/getSigner', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.sid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteSigner.queryData(params.sid,function(result){
        res.send(result);
    });
})

app.get('/getSignerByAidAndOpenid', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null || params.openid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteSigner.queryDataByAidAndOpenid(params.aid, params.openid, function(result){
        res.send(result);
    });
})

app.post('/addSigner', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteSigner.addData(req.body,function(result,sid){
      	res.send(result);
  	});
})


app.put('/updateSigner', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.sid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteSigner.updateData(params.sid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteSigner', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.sid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteSigner.delData(params.sid,function(result){
      	res.send(result);
  	});
})

//奖品接口
app.get('/listAwards', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteAward.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getAwards', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteAward.queryData(params.aid,function(result){
        res.send(result);
    });
})

app.post('/addAward', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteAward.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateAward', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.awid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteAward.updateData(params.awid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteAward', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.awid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteAward.delData(params.awid,function(result){
      	res.send(result);
  	});
})

//礼物接口
app.get('/listGifts', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteGift.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getGift', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.gid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteGift.queryData(params.gid,function(result){
        res.send(result);
    });
})

app.post('/addGift', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteGift.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateGift', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.gid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteGift.updateData(params.gid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteGift', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.gid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteGift.delData(params.gid,function(result){
      	res.send(result);
  	});
})

//赠送接口
app.get('/listPresents', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	votePresent.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getPresentsDetail', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.sid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	votePresent.queryDataBySidDetail(params.sid,function(result){
        res.send(result);
    });
})

app.get('/getPresentsTotal', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.sid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	votePresent.queryDataBySidTotal(params.sid,function(result){
        res.send(result);
    });
})

app.post('/addPresent', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	votePresent.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updatePresent', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.pid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	votePresent.updateData(params.pid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deletePresent', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.pid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	votePresent.delData(params.pid,function(result){
      	res.send(result);
  	});
})

//点数接口
app.put('/updatePrize', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteSetting.updatePrize(req.body,function(result){
      	res.send(result);
  	});
})

app.get('/getPrize', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');

	voteSetting.queryPrize(function(result){
      	res.send(result);
  	});
})

//投票者记录
app.post('/addVoter', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voter.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.get('/getVoter', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.openid==null || params.sid == null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}
	
	console.log('getvoter',params.openid,params.sid);

	voter.queryData(params.openid,params.sid,function(result){
        res.send(result);
    });
})

app.delete('/deleteVoter', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.openid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voter.delData(params.openid,function(result){
      	res.send(result);
  	});
})

//sys
app.get('/getAdmin',function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.username==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	admin.queryData(params.username,function(result){
        res.send(result);
    });
})

app.put('/updatePwd',function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	admin.updateData(req.body,function(result){
      	res.send(result);
  	});
})

app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({ result: 'fail', error: { code: 1001, message: 'File is too big' } })
    return 
  }
})

/* GET users listing.以下为微信认证部分 */
app.get('/oauth', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    //var domain = "http://datongys.cn/vote/"
	var domain = "http://datongys.cn/backend/oauthcallback";
    var auth_callback_url = domain;
    var url = client.getAuthorizeURL(auth_callback_url, '', 'snsapi_userinfo');
    console.log(url);
    // 重定向请求到微信服务器
    res.redirect(url);
});

app.get('/oauthcallback', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    var code = req.query.code;
    client.getAccessToken(code, function (err, result) {
        console.log(result);
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
            var userInfo = result;			
            // save or other opration            
			//res.send(userInfo);
			console.log(userInfo);
			voteUser.addOrUpdateData(userInfo.openid,userInfo,function(result,openid){
				//res.send(openid);	
				console.log('getorupdateuser'+result);
				var redUrl = "http://datongys.cn/vote/#/";
				redUrl += "?openid="+userInfo.openid;
				res.redirect(redUrl);
			});
        });
    });
});

//支付
app.post('/addOrder',function(req,res,next) {
	res.header('Access-Control-Allow-Origin', '*');
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
	var data = req.body;
	if(ip.indexOf(',') > 0 ) ip = '127.0.0.1';
	//console.log('order',data);
	var order = {
		body: data.body,
		attach: '{"dtys":"test"}',
        //detail: data.detail,
        out_trade_no: '20180214'+Math.random().toString().substr(2, 10),
        total_fee: data.fee,
        spbill_create_ip: ip,
        openid: data.openid,
		trade_type:'JSAPI'
	}
	wxpay.weixinorderpayment(order,function(result){
		res.send(result);
	});
});


//创建服务
var server = app.listen(8081,function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
