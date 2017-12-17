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

app.get('/listActivities', function (req, res) {

	voteActivity.queryData("",function(result){
        res.send(result);
    });
})

app.get('/getActivity', function (req, res) {

	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteActivity.queryData(params.aid,function(result){
        res.send(result);
    });
})

app.post('/addActivity', function (req, res) {

	if (req.body == null) {
		return;
	}

	voteActivity.addData(req.body,function(result,aid){
      	res.send(aid);
  	});
})

app.put('/updateActivity', function (req, res) {

	if (req.body==null || req.body.aid==null) {
		return;
	}

	voteActivity.updateData(req.body.aid,req.body,function(result){
      	res.send(result);
  	});
})

app.delete('/deleteActivity', function (req, res) {

	var params = url.parse(req.url, true).query;
	if (params==null || params.aid==null) {
		return;
	}

	voteActivity.delData(params.aid,function(result){
      	res.send(result);
  	});
})

var server = app.listen(8102, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})