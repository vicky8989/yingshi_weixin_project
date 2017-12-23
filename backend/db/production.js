var dbLink = require('./dblink');

var Production = function()
{
    var ObjectId = require('mongodb').ObjectID;

    this.addData = function(userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('production');

            var data = {
                'uid': userData.uid,
                'aid': userData.aid,
                'name': userData.name ,
                'manifesto': userData.manifesto,
                'banner': userData.banner,
                'praisenum': userData.praiseNum,
                'giftnum': userData.giftNum,
                'giftpay': userData.giftPay
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

    this.updateData = function(pid,userData,callback)
    {
        if (pid == null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('production');
            var whereStr = {"_id":ObjectId(pid)};
            var data = {$set:{
                'uid': userData.uid,
                'aid': userData.aid,
                'name': userData.name ,
                'manifesto': userData.manifesto,
                'banner': userData.banner,
                'praisenum': userData.praiseNum,
                'giftnum': userData.giftNum,
                'giftpay': userData.giftPay}};

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
        if (aid==null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('production');

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

    this.delData = function(pid,callback)
    {
        if (pid == null) {
            return;
        }
        
        dbLink.link(function(err,db) {

            var collection = db.collection('production');
            var whereStr = {"_id":ObjectId(pid)};

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

module.exports = new Production();