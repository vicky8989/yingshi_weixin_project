var express = require('express');
var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');

var voteActivity = require('./db/activity');
var voteActivityInfo = require('./db/activityInfo');
var voteAwards = require('./db/awards');
var voteProduction = require('./db/production');
var file = require('./file/file');

var app = express();
var upload = file.uploadFile();

app.use(express.static(file.getImageUrlPath()));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));


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

var server = app.listen(8085,function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})