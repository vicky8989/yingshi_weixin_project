var dbLink = require('./dblink');

var ActivityInfo = function()
{
    var ObjectId = require('mongodb').ObjectID;

    this.addData = function(userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('activityinfo');

            var data = {
                'aid':userData.aid,
                'enrolstart': userData.enrolStart,
                'enrolend': userData.enrolEnd,
                'votestart': userData.voteStart ,
                'voteend': userData.voteEnd,
                'info': userData.info,
                'banner':userData.banner,
                'rule':userData.rule
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

            var collection = db.collection('activityinfo');

            if (userData.uid) {
                  console.log('Error: can not update uid /n');
                  return;
            }

            var whereStr = {"aid":ObjectId(aid)};
            var data = {$set:{'openid':userData.openid}};

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

            var collection = db.collection('activityinfo');

            if (aid == "") {

                collection.find().toArray(function(err, result) {
                    if(err)
                    {
                      console.log('Error:'+ err);
                      return;
                    }

                    callback(result);
                });
            }
            else{
                var whereStr = {"aid":ObjectId(aid)};
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

    this.delData = function(aid,callback)
    {
        if (aid == null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('activityinfo');
            var whereStr = {"aid":ObjectId(aid)};

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

module.exports = new ActivityInfo();