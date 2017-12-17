var express = require('express');
var app = express();
var voteActivity = require('./db/activity');
var voteActivityInfo = require('./db/activityInfo');
 
app.get('/listActivities', function (req, res) {

	voteActivityInfo.queryData("",function(result){
        res.send(result);
    });
})

var server = app.listen(8084, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})