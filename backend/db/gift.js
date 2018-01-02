var dbLink = require('./dblink');

var Gift = function()
{
    var ObjectId = require('mongodb').ObjectID;

    var collection = null;
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('gift');
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
            'name': userData.name,
            'giftimg': userData.giftImg,
            'num': userData.num
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

    this.updateData = function(gid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (gid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(gid)};
        var data = {$set:{
            'name': userData.name,
            'giftimg': userData.giftImg,
            'num': userData.num}};

        collection.update(whereStr,data, function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.queryData = function(gid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (gid==null) {
            return;
        }

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
    }

    this.delData = function(gid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (gid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(gid)};
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

module.exports = new Gift();