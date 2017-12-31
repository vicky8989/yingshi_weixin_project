var DBLink = function()
{
	var mongoClient = require('mongodb').MongoClient;
	var collectionMap = require('../common/map');
	var LinkURL = 'mongodb://localhost:27017/vote';
	var LinkError = null;
	var mongoDB = null;

	this.link = function() {

		if (mongoDB != null) {
			return mongoDB;
		}

		mongoClient.connect(LinkURL, function(err, db) {
			if (!err)
			{
				mongoDB = db;
				collectionMap.put('user', mongoDB.collection('user'));
				collectionMap.put('activity', mongoDB.collection('activity'));
				collectionMap.put('signer', mongoDB.collection('signer'));

				return mongoDB;
			}

			LinkError = err;
			return null;
		});
	};

	this.collection = function (name) {
		if (mongoDB == null) {
			return null;
		}

		if (collectionMap.get(name) != null) {
			return collectionMap.get(name);
		}

		var collection = mongoDB.collection(name);
		collectionMap.put(name, collection);
		return collection;
	}
};

if (global._dbLink == null) {
	global._dbLink = new DBLink();
}

module.exports = global._dbLink;

