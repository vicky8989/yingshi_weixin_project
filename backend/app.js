var express = require('express');
var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');

var voteUser = require('./db/user');
var voteActivity = require('./db/activity');
var voteActivityInfo = require('./db/activityInfo');
var voteAwards = require('./db/awards');
var voteProduction = require('./db/production');
var voteGift = require('./db/gift');
var votePresent = require('./db/present');
var file = require('./file/file');

var app = express();
var upload = file.uploadFile();

app.use(express.static(file.getImageUrlPath()));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

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
		return;
	}

	voteUser.queryData(params.openid,function(result){
        res.send(result);
    });
})

app.post('/addUser', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		return;
	}

	voteUser.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateUser', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.uid==null) {
		return;
	}

	voteUser.updateData(params.uid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteUser', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.uid==null) {
		return;
	}

	voteUser.delData(params.uid,function(result){
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

app.get('/getActivity', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteActivity.queryData(params.aid,function(result){
        res.send(result);
    });
})

app.post('/addActivity', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
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
		return;
	}

	voteActivity.updateData(params.aid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteActivity', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteActivity.delData(params.aid,function(result){
      	res.send(result);
  	});
})

//活动详情相关接口
app.get('/listActivityInfos', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteActivityInfo.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getActivityInfo', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteActivityInfo.queryData(params.aid,function(result){
        res.send(result);
    });
})

app.post('/addActivityInfo', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		return;
	}

	voteActivityInfo.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateActivityInfo', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteActivityInfo.updateData(params.aid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteActivityInfo', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteActivityInfo.delData(params.aid,function(result){
      	res.send(result);
  	});
})

//奖品接口
app.get('/listAwards', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteAwards.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getAwards', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteAwards.queryData(params.aid,function(result){
        res.send(result);
    });
})

app.post('/addAward', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		return;
	}

	voteAwards.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateAward', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.awid==null) {
		return;
	}

	voteAwards.updateData(params.awid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteAward', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.awid==null) {
		return;
	}

	voteAwards.delData(params.awid,function(result){
      	res.send(result);
  	});
})

//作品接口
app.get('/listProductions', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	voteProduction.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getProductions', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteProduction.queryData(params.aid,function(result){
        res.send(result);
    });
})

app.post('/addProduction', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		return;
	}

	voteProduction.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateProduction', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.pid==null) {
		return;
	}

	voteProduction.updateData(params.pid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteProduction', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.pid==null) {
		return;
	}

	voteProduction.delData(params.pid,function(result){
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
		return;
	}

	voteGift.queryData(params.gid,function(result){
        res.send(result);
    });
})

app.post('/addGift', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
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
		return;
	}

	voteGift.delData(params.gid,function(result){
      	res.send(result);
  	});
})

//礼物接口
app.get('/listPresents', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	votePresent.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getPresents', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null) {
		return;
	}

	if (params.aid!=null) {
		votePresent.queryData(params.aid,function(result){
        	res.send(result);
    	});
	}
	else if (params.pid != null) {
		votePresent.queryDataByPID(params.pid,function(result){
        	res.send(result);
    	});
	}
})

app.post('/addPresent', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		return;
	}

	votePresent.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.delete('/deletePresents', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null) {
		return;
	}

	if (params.aid!=null) {
		votePresent.delData(params.aid,function(result){
        	res.send(result);
    	});
	}
	else if (params.pid != null) {
		votePresent.delDataByPID(params.pid,function(result){
        	res.send(result);
    	});
	}
})

var server = app.listen(8085,function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})