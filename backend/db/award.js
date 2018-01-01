var dbLink = require('./dblink');

var Award = function()
{
    var ObjectId = require('mongodb').ObjectID;

    var collection = null;
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('awards');
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
    }

    this.updateData = function(awid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (awid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(awid)};
        var data = {$set:{
            'aid':userData.aid,
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
    }

    this.queryData = function(aid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (aid == null) {
            return;
        }

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
    }

    this.delData = function(awid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (awid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(awid)};

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

module.exports = new Award();