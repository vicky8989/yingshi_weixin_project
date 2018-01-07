var dbLink = require('./dblink');
var Map = require('../common/map');

var Present = function()
{
    var ObjectId = require('mongodb').ObjectID;

    var collection = null;
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('present');
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
            'sid': userData.sid,
            'openid': userData.openid,
            'nickname': userData.nickname,
            'headimgurl': userData.headimgurl,
            'num': userData.num,
            'gid': userData.gid,
            'giftname': userData.giftname,
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
    }

    this.updateData = function(pid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (pid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(pid)};
        var data = {$set:{
            'sid': userData.sid,
            'openid': userData.openid,
            'nickname': userData.nickname,
            'headimgurl': userData.headimgurl,
            'num': userData.num,
            'gid': userData.gid,
            'giftname': userData.giftname,
            'time': userData.time}};

        collection.update(whereStr,data, function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.queryData = function(pid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (pid==null) {
            return;
        }

        if (pid=="") {
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
            var whereStr = {"_id":ObjectId(pid)};
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

    this.queryDataBySidDetail = function(sid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (sid==null) {
            return;
        }

        var whereStr = {"sid":sid};
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.queryDataBySidTotal = function(sid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (sid==null) {
            return;
        }

        var whereStr = {"sid":sid};
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            if (result.length == 0) {
                callback([]);
                return;
            }

            var giftMap = new Map;
            for (var i=0 ; i<result.length; i++)
            {
                var present = result[i];

                var num = giftMap.get(present.gid);
                if (num == null) 
                {
                    num = present.num;
                }
                else
                {
                    num += present.num;
                }

                giftMap.put(present.gid,num);
            }

            console.log(giftMap);
            
            if (giftMap.isEmpty()) {
                callback([]);
            }
            else
            {
                callback(giftMap.entrys());
            }

        });
    }

    this.delData = function(pid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (pid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(pid)};
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

module.exports = new Present();