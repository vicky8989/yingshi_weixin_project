var DBLink = function()
{
	var mongoClient = require('mongodb').MongoClient;
	var LinkURL = 'mongodb://localhost:27017/vote';
	var LinkError = null;
	var mongoDB = null;

	this.link = function(callback)	
	{
		if (mongoDB == null) 
		{
			mongoClient.connect(LinkURL, function(err, db) {
				if (!err)
				{
					mongoDB = db;
				}
				LinkError = err;					
				callback(LinkError,mongoDB);
			});
		}
		else
		{
			callback(LinkError,mongoDB);
		}
	};

};

module.exports = new DBLink();

