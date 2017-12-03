#!/bin/env node

// modules
var http = require('http'),
url = require('url'),
util = require('util'),
fs = require('fs');
var log = require('./log/log');
var jsonpMongo = require('./db/jsonpMongo'),
wx = require('./wx/wx'),
wxuser = require('./wx/wxuser'),
dofile = require('./file/dofile'),
getfile = require('./file/getStaticFile'),
mime = require('./mime/mime'),
// socket = require('./js/socket/socket'),
// urlWhiteList = require('./js/misc/urlWhiteList'),
// m_getMac = require('getmac'),
// saveMpFile = require('./bluemp/skybox/saveMpFile.js'),
// saveZnhFile = require('./znh/js/saveShareFile.js');



var _ip   = '115.182.53.159';
var _port = 6345;
// var _ip   = 'localhost';
// var _port = 6345;

// global vars
var host = process.env.OPENSHIFT_NODEJS_IP || _ip;
var port = process.env.OPENSHIFT_NODEJS_PORT  || _port;


// mongolab -> url:'mongodb://easyfrog:tianchi@ds031531.mongolab.com:31531/general'
var mgUrl = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://inno:dong@115.182.53.159:27017/';

/**
 * 用来处理与 MongoLab 数据库进行交互
 * 
 * 使用JSONP方式通信 pathName:/jsonp
 */
 var server = http.createServer(function(req,res){

	// record original req & res
	var _req = req, _res = res;

	// analyse req
	var parse     = url.parse(req.url ,true);
	var pathName  = parse.pathname;
	var hostName  = parse.hostname;
	var queryJson = {};
	var data      = '';
	// req headers referer's hostname
	var _hostname = req.headers.referer ? url.parse(req.headers.referer, true).hostname : null;

	// Jsonp callback funciton
	function callback( data ) {
		res.write(queryJson.callback + '(' + JSON.stringify(data) + ')');
		res.end();
	}

	// Get 请求
	if (req.method.toLowerCase() == 'get') {
		queryJson = parse.query;
	}

	// CORS
	res.setHeader('Access-Control-Allow-Origin','*');

	// 进入路由
	switch(pathName) {
		case '/db': 	// 数据库
			// if (urlWhiteList.check(_hostname, res)) {
				// set mongodb url
				queryJson.url = queryJson.url || mgUrl;
				jsonpMongo.analyse(queryJson, callback);
			// }
			break;
		case '/wx': 	// 微信
		log.setLog('wx', JSON.stringify(queryJson));
		wx.getSignatureJson(queryJson, callback);
		break;
		case '/wxuser':
		log.setLog('wxuser', JSON.stringify(queryJson));
		wxuser.getUserInfo(queryJson, callback);
		break;
		case '/wxalluseropenid'://获取所有用户openid
		log.setLog('wxalluseropenid', JSON.stringify(queryJson));
		wxuser.getAllUserOpenID(queryJson, callback);
		break;

		case '/code':
		wx.getCode(function(str) {
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(str);
		});
		break;
		case '/upload':
		console.log('upload');
		var df = new dofile({req:req, res:res, cb:function(obj) {
			_res.end();
			delete obj;
			df = undefined;
		}});
		break;
		case '/download':
		console.log('down');
		break;
		case '/log':
		res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
		res.write(log.toString());
		res.end();
		break;
		case '/logclear':  // no use nex delete it
		log.clear();
		res.write(log.toString());
		res.end();
		break;
		case '/mp_publish': //麦片发布项目
		// console.log(JSON.stringify(queryJson));
		var mpFile = new saveMpFile();
		mpFile.readFile(queryJson,function(data){
			res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
			res.write(data);
			res.end();
		});

		break;
		case '/getIpAddress'://获取mac地址
		m_getMac.getMac(function(err,_macAddress){
			if (err)  throw err
				var macAddress = _macAddress;
			// console.log(macAddress);
			// var ipAddress = req.connection.remoteAddress;
			res.write(macAddress);
			res.end();
		});
		break;
		case '/getProject'://麦片获取项目
		fs.exists('bluemp/skyboxs/'+queryJson.filename, function( exists ){
			res.write(exists+"");
			res.end();
		});
		break;
		case '/mp_upload': //麦片上传图片
		var mpFile = new saveMpFile();
		mpFile.saveFile({req:req, res:res});
		break;

		case '/znh_upload'://中南海
		var znhFile = new saveZnhFile();
		// znhFile.saveFile({req:req, res:res});
		znhFile.saveFileByBase64({req:req, res:res});

		break;

		default:
		console.log('pathName: ' + pathName);

			// get data's static files
			if (pathName.indexOf('/data') == 0) {
				getfile(pathName, __dirname, function(file) {
					if (file == null) {
						res.writeHead(404,{'Content-Type':'text/html'});
						res.end();
					} else {
						var ext = pathName.slice(pathName.lastIndexOf('.') + 1);
						var type = mime[ext] || "text/plain";
						console.log('ext: ' + ext, 'type: ' + type);
						res.writeHead(200,{'Content-Type':type});
						res.write(file);
						res.end();
					}
				});
			} else if (pathName.indexOf('/bluemp') == 0) {
				
				getfile(pathName, __dirname, function(file) {
					if (file == null) {
						res.writeHead(404,{'Content-Type':'text/html'});
						res.end();
					} else {
						var ext = pathName.slice(pathName.lastIndexOf('.') + 1);
						var type = mime[ext] || "text/plain";
						console.log('ext: ' + ext, 'type: ' + type);
						res.writeHead(200,{'Content-Type':type});
						res.write(file);
						res.end();
					}
				});
			}

			else if (pathName.indexOf('/znh') == 0) {
				
				getfile(pathName, __dirname, function(file) {
					if (file == null) {
						res.writeHead(404,{'Content-Type':'text/html'});
						res.end();
					} else {
						var ext = pathName.slice(pathName.lastIndexOf('.') + 1);
						var type = mime[ext] || "text/plain";
						console.log('ext: ' + ext, 'type: ' + type);
						res.writeHead(200,{'Content-Type':type});
						res.write(file);
						res.end();
					}
				});
			}

			else {
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(  
					'<form action="/upload" enctype="multipart/form-data" '+  
					'method="post">'+  
					'<input type="text" name="title"><br>'+  
					'<input type="file" name="upload" multiple="multiple"><br>'+  
					'<input type="submit" value="Upload">'+  
					'</form>'  
					); 
			}
			break;
		}	
	});

 server.listen(port,host);
 console.log('Server start: ' + host + ':' + port);


/**
 * socket.io
 */
 socket(server);