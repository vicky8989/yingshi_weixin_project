var dbLink = require('./dblink');

var Awards = function()
{
    var ObjectId = require('mongodb').ObjectID;

    this.addData = function(userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('awards');

            var data = {
                'aid':userData.aid,
                'name': userData.name,
                'num': userData.num,
                'prizeinfo': userData.prizeInfo ,
                'prizeimg': userData.prizeImg,
                'info': userData.info
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

            var collection = db.collection('awards');
            var whereStr = {"aid":aid};
            var data = {$set:{
                'name': userData.name,
                'num': userData.num,
                'prizeinfo': userData.prizeInfo ,
                'prizeimg': userData.prizeImg,
                'info': userData.info}};

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

            var collection = db.collection('awards');
            if (aid != ""){
                var whereStr = {"aid":aid};

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

            var collection = db.collection('awards');
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
};

module.exports = new Awards();