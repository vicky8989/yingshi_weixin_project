var io = require('socket.io'),
	util = require('util'),
	log = require('../log/log');

// socket record map
var socketMap = {};

module.exports = function(server) {
	var socket = io.listen(server);

	socketMap = socket.of('/').connected;

	// 连接
	socket.on('connection', function(client) {
		log.setLog('socket connection', client.id);

		// 将 id 转回客户端
		client.send({id:client.id});

		// 收到客户端的信息
		client.on('message', function(data) {
			log.setLog('socket message', client.id + ':' + JSON.stringify(data));

			var msg = 'done';
		
			// echo
			client.send(msg);
		});

		client.on('send', function(data) {
			var conns = data.connections || client.connections;
			for (var i = 0; i < conns.length; i++) {
				var conn = socketMap[conns[i]];
				if (conn) {
					conn.send(data.data);
				}
			}
		});

		client.on('disconnect', function() {
			delete socketMap[client.id];
			log.setLog('socket disconnect', client.id);
		});
	});
};