var express = require('express');
var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');

var dbLink = require('./db/dbLink');
dbLink.link();

var voteUser = require('./db/user');
var voteActivity = require('./db/activity');
var voteSigner = require('./db/signer');
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
	if (params==null || params.uid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteUser.queryData(params.uid,function(result){
        res.send(result);
    });
})

app.get('/getUserByOpenId', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var params = url.parse(req.url, true).query;
	if (params==null || params.openid==null) {
		res.status(400).send({'error':"Bad Request"});
		return;
	}

	voteUser.queryDataByOpenId(params.openid,function(result){
        res.send(result);
    });
})

app.post('/addUser', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	if (req.body == null) {
		res.status(400).send({'error':"Bad Request"});
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
		res.status(400).send({'error':"Bad Request"});
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
		res.status(400).send({'error':"Bad Request"});
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

//创建服务
var server = app.listen(8085,function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
