var dbLink = require('./dblink');

var Activity = function()
{
    var ObjectId = require('mongodb').ObjectID;

    this.addData = function(userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('activity');

            var data = {
                'name': userData.name,
                'start': userData.start,
                'end': userData.end ,
                'status': userData.status,
                'des': userData.des,
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

    this.updateData = function(aid,userData,callback)
    {
        if (aid == null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('activity');
            var whereStr = {"_id":ObjectId(aid)};
            var data = {$set:{
                'name': userData.name,
                'start': userData.start,
                'end': userData.end ,
                'status': userData.status,
                'des': userData.des}};

            collection.update(whereStr,data, function(err, result) { 
                if(err)
                {
                  console.log('Error:'+ err);
                  return;
                }

                callback(result);
            });
        });
    }

    this.queryData = function(aid,callback)
    {
        if (aid == null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('activity');
            if (aid != ""){
                var whereStr = {"_id":ObjectId(aid)};

                collection.find(whereStr).toArray(function(err, result) {
                    if(err)
                    {
                      console.log('Error:'+ err);
                      return;
                    }

                    callback(result);
                });
            }else{

                collection.find().toArray(function(err, result) {
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

    this.delData = function(aid,callback)
    {
        if (aid == null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('activity');
            var whereStr = {"_id":ObjectId(aid)};

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

module.exports = new Activity();