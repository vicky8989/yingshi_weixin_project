var dbLink = require('./dblink');

var Present = function()
{
    var ObjectId = require('mongodb').ObjectID;

    this.addData = function(userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('present');

            var data = {
                'gid': userData.gid,
                'mum': userData.num,
                'pid': userData.pid,
                'aid': userData.aid,
                'uid': userData.uid,
                'time': userData.time
            };

            collection.insert(data, function(err, result) { 
                if(err)
                {
                  console.log('Error:'+ err);
                  return;
                }

                callback(result,result.ops[0]._id);
            });
        });
    }

    this.queryData = function(aid,callback)
    {
        if (aid==null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('present');

            if (aid=="") {
                collection.find().toArray(function(err, result) {
                    if(err)
                    {
                      console.log('Error:'+ err);
                      return;
                    }

                    callback(result);
                });
            }
            else
            {
                var whereStr = {"aid":aid};
                collection.find(whereStr).toArray(function(err, result) {
                    if(err)
                    {
                      console.log('Error:'+ err);
                      return;
                    }

                    callback(result);
                });
            }
        });
    }

    this.queryDataByPID = function(pid,callback)
    {
        if (pid==null || pid=="") {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('present');
           
            var whereStr = {"pid":pid};
            collection.find(whereStr).toArray(function(err, result) {
                if(err)
                {
                  console.log('Error:'+ err);
                  return;
                }

                callback(result);
            });
        });
    }

    this.delData = function(aid,callback)
    {
        if (aid == null) {
            return;
        }
        
        dbLink.link(function(err,db) {

            var collection = db.collection('present');
            var whereStr = {"aid":aid};

            collection.remove(whereStr, function(err, result) {
                if(err)
                {
                  console.log('Error:'+ err);
                  return;
                }

                callback(result);
            });
        });
    }

    this.delDataByPID = function(pid,callback)
    {
        if (pid == null) {
            return;
        }
        
        dbLink.link(function(err,db) {

            var collection = db.collection('present');
            var whereStr = {"pid":pid};

            collection.remove(whereStr, function(err, result) {
                if(err)
                {
                  console.log('Error:'+ err);
                  return;
                }

                callback(result);
            });
        });
    }
};

module.exports = new Present();