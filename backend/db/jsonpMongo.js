
var mongoClient = require('mongodb').MongoClient;
var log = require('../log/log');

// db cache
var dbs = {};

// var url, dbname, coll, method, query, data, options, _res

var jsonpMongo = function( queryJson, callback ) {
	var url     = queryJson.url;
	var dbname  = queryJson.db || '';
	var coll    = queryJson.coll;
	var method  = queryJson.method; // insert | remove | update | find
	var query   = queryJson.query ? JSON.parse(queryJson.query) : {};

	var data    = queryJson.data ? JSON.parse(queryJson.data) : {};
	var options = queryJson.options ? JSON.parse(queryJson.options) : null; 

	var _res = {result:undefined};
		// mongodb url + db
	url = url + dbname;
	// log.setLog('db', 'db: ' + dbname + ' coll: ' + coll + ' url: ' + url);

	var _db;

	_db = dbs[url];

	// 如果没有缓存就链接数据库并保存下来
	if (_db == undefined) {

		mongoClient.connect(url, function(err,db){
			if (err) {
				console.log('connect error: ' + err);
				log.setLog('db', 'connect error: ' + JSON.stringify(err));
				if (callback) {callback(_res);};
				return;
			};

			_db = db;
			dbs[url] = db;
			works(_db, coll, method, data, query, _res, callback, options);
		});
	} else {
		works(_db, coll, method, data, query, _res, callback, options);
	}
};

// 得到数据库之后的操作
function works(_db, coll, method, data, query, _res, callback, options) {
	var _coll;
	_db.collection(coll, function(err,collection){
		if (err) {
			console.log('Get Collection "' + coll + '"" ERROR: ' + err);
			log.setLog('db', 'collection error: coll:' + coll + ' ' + JSON.stringify(err));
			if (callback) {callback(_res);};
			return;
		};

		_coll = collection;

		switch(method) {
			case 'insert':
				options = options || {};
				_coll.insert(data,options,function(err,doc) {
					if (err) {console.log(err);};
					_res.result = doc[0];
					
					if (callback) {callback(_res);};
					// _db.close();
				});
			break;
			case 'remove':
				options = options || {};
				_coll.remove(query,options,function(err,doc) {
					if (err) {console.log(err);};
					_res.result = doc[0];

					if (callback) {callback(_res);};
					// _db.close();
				});
			break;
			case 'update':
				options = options || {upsert:true,multi:false};
				_coll.update(query,data,options,function(err,doc) {
					if (err) {console.log(err);};
					_res.result = doc;

					if (callback) {callback(_res);};
					// _db.close();
				});
			break;
			case 'find':
				options = options || {};
				_coll.find(query,options,function(err,doc) {
					if (err) {console.log(err)};

					doc.toArray(function(err,arr) {
						_res.result = arr;
						if (callback) {callback(_res);};
						// _db.close();
					});
				});
			break;

			// case 'sort':
			// options = options || {};
			// _coll.find().sort(options).limit(options.pageNum).toArray(function(err, result){
			// 	if(err)
   // 				{
   //   				 	console.log('Error:'+ err);
   //    					return;
   // 				} 
   // 				if (callback) {callback(result);};    
			// });
			// break;
			default:
				if (callback) {callback(_res);};
				// _db.close();
			break;
		};		
	}); 
};

exports.analyse = jsonpMongo;
