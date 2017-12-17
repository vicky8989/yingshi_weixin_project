var dbLink = require('./dblink');

var User = function()
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
        if (uid == null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('user');
            var whereStr = {"_id":ObjectId(uid)};
            var data = {$set:{
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
                'adress':userData.adress}};

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
        if (openid==null) {
            return;
        }

        dbLink.link(function(err,db) {

            var collection = db.collection('user');

            if (openid=="") {
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
                var whereStr = {"openid":openid};
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

    this.delData = function(uid,callback)
    {
        if (uid == null) {
            return;
        }
        
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

module.exports = new User();