var dbLink = require('./dblink');

var User = function()
{
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

    this.addOrUpdateData = function(openid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (openid == null) {
            return;
        }

        var whereStr = {"openid":openid};
        var data = {$set:{
            'nickname': userData.nickname,
            'headimgurl': userData.headimgurl ,
            'sex': userData.sex,
            'language': userData.language,
            'city': userData.city,
            'province': userData.province,
            'country': userData.country}};

        collection.update(whereStr,data,{upsert:true,multi:false},function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result,openid);
        });
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

    this.updateData = function(openid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (openid == null) {
            return;
        }

        var whereStr = {"openid":openid};
        var data = {$set:{
            'nickname': userData.nickname,
            'headimgurl': userData.headimgurl ,
            'sex': userData.sex,
            'language': userData.language,
            'city': userData.city,
            'province': userData.province,
            'country': userData.country}};

        collection.update(whereStr,data,function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }
    

    this.queryData = function(openid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (openid==null) {
            return;
        }

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
    }

    this.delData = function(openid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (openid == null) {
            return;
        }

        var whereStr = {"openid":openid};
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