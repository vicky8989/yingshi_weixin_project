var dbLink = require('./dblink');

var User = function()
{
    var ObjectId = require('mongodb').ObjectID;
    var user = null;
    
    var collection = null;
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('user');
            if (collection == null) {
                return false;
            }
        }

        return true;
    }

    this.addData = function(userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        var data = {
            'openid': userData.openid,
            'nickname': userData.nickname,
            'headimgurl': userData.headimgurl ,
            'sex': userData.sex,
            'language': userData.language,
            'city': userData.city,
            'province': userData.province,
            'country': userData.country
        };

        collection.insert(data, function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result,result.ops[0]._id);
        });
    }

    this.updateData = function(uid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (uid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(uid)};
        var data = {$set:{
            'openid': userData.openid,
            'nickname': userData.nickname,
            'headimgurl': userData.headimgurl ,
            'sex': userData.sex,
            'language': userData.language,
            'city': userData.city,
            'province': userData.province,
            'country': userData.country}};

        collection.update(whereStr,data, function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.queryData = function(uid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (uid==null) {
            return;
        }

        if (uid=="") {
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
            var whereStr = {"_id":ObjectId(uid)};
            collection.find(whereStr).toArray(function(err, result) {
                if(err)
                {
                  console.log('Error:'+ err);
                  return;
                }

                callback(result);
            });
        }
    }

    this.queryDataByOpenId = function(openid)
    {
        if (this.collection() == false) {
            return;
        }

        if (openid == null) {
            return;
        }

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

    this.delData = function(uid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (uid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(uid)};
        collection.remove(whereStr, function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

};

module.exports = new User();