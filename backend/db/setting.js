var dbLink = require('./dblink');

var Setting = function()
{
    var ObjectId = require('mongodb').ObjectID;

    var collection = null;
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('setting');
            if (collection == null) {
                return false;
            }
        }

        return true;
    }
   
    this.updatePrize = function(userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (userData.prize == null) {
            return;
        }

        var data = {$set:{
            'setting':"setting",
            'prize':userData.prize}};

        var whereStr = {"setting":"setting"};
        collection.update(whereStr,data,{upsert:true,multi:false},function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.queryPrize = function(callback)
    {
        if (this.collection() == false) {
            return;
        }

        var whereStr = {"setting":'setting'};

        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            if (result.length == 0) 
            {
                callback({"setting":'setting','prize':10});
            }
            else
            {
                callback(result[0]);
            }
        });
    }
};

module.exports = new Setting();