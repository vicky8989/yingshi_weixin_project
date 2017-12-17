var dbLink = require('./dblink');

var Gift = function()
{
    var ObjectId = require('mongodb').ObjectID;

    this.addData = function(userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('gift');

            var data = {
                'name': userData.name,
                'img': userData.img,
                'pay': userData.pay
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

    this.updateData = function(gid,userData,callback)
    {
        if (gid == null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('gift');
            var whereStr = {"_id":ObjectId(gid)};
            var data = {$set:{
                'name': userData.name,
                'img': userData.img,
                'pay': userData.pay}};

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

    this.queryData = function(gid,callback)
    {
        if (gid==null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('gift');

            if (gid=="") {
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
                var whereStr = {"_id":ObjectId(gid)};
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

    this.delData = function(gid,callback)
    {
        if (gid == null) {
            return;
        }
        
        dbLink.link(function(err,db) {

            var collection = db.collection('gift');
            var whereStr = {"_id":ObjectId(gid)};

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

module.exports = new Gift();