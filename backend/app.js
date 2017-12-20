var express = require('express');
var app = express();

var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var voteActivity = require('./db/activity');
var voteActivityInfo = require('./db/activityInfo');

app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));

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
	if (req.body==null || req.body.aid==null) {
		return;
	}

	voteActivity.updateData(req.body.aid,req.body,function(result){
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
	if (req.body==null || req.body.aid==null) {
		return;
	}

	voteActivityInfo.updateData(req.body.aid,req.body,function(result){
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

var server = app.listen(8086, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})