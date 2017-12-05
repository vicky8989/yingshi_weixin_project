var dbLink = require('./dblink');

var user = function()
{
    var ObjectId = require('mongodb').ObjectID;

    this.addData = function(userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('user');

            var data = {
                'openid': userData.openid,
                'nickname': userData.nickname,
                'headimgurl': userData.headimgurl ,
                'sex': userData.sex,
                'language': userData.language,
                'city': userData.city,
                'province': userData.province,
                'country': userData.country,
                'name':userData.name,
                'phone':userData.phone,
                'adress':userData.adress
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

    this.updateData = function(uid,userData,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('user');

            if (userData.uid) {
                  console.log('Error: can not update uid /n');
                  return;
            }

            var whereStr = {"_id":ObjectId(uid)};
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

    this.queryData = function(openid,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('user');
            var whereStr = {"openid":openid};

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

    this.delData = function(uid,callback)
    {
        dbLink.link(function(err,db) {

            var collection = db.collection('user');
            var whereStr = {"_id":ObjectId(uid)};

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

module.exports = new user();