var dbLink = require('./dblink');

var Activity = function(collection)
{
    var ObjectId = require('mongodb').ObjectID;
    var collection = null;

    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('activity');
            if (collection == null) {
                return false;
            }

            console.log(collection);
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
            'status': userData.status,
            'sponsor': userData.sponsor,
            'enrolstart': userData.enrolStart,
            'enrolend': userData.enrolEnd,
            'votestart': userData.voteStart,
            'voteend': userData.voteEnd,
            'info': userData.info,
            'infoimg': userData.infoImg,
            'participation':userData.participation,
            'process':userData.process,
            'contact':userData.contact,
            'banner':userData.banner,
            'rule':userData.rule,
            'pv':userData.pv
        };

        console.log(data);
        console.log(collection);

        collection.insert(data, function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result,result.ops[0]._id);
        });
    }

    this.updateData = function(aid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (aid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(aid)};
        var data = {$set:{
            'name': userData.name,
            'status': userData.status,
            'sponsor': userData.sponsor,
            'enrolstart': userData.enrolStart,
            'enrolend': userData.enrolEnd,
            'votestart': userData.voteStart,
            'voteend': userData.voteEnd,
            'info': userData.info,
            'infoimg': userData.infoImg,
            'participation':userData.participation,
            'process':userData.process,
            'contact':userData.contact,
            'banner':userData.banner,
            'rule':userData.rule,
            'pv':userData.pv}};

        collection.update(whereStr,data, function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.updateDataPV = function(aid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (aid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(aid)};
        var data = {$set:{
            'pv':userData.pv}};

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

            var whereStr = {"_id":ObjectId(aid)};
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

    this.queryDataByStatus = function(status,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (status == null) {
            return;
        }

        var whereStr = {"status":status};
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.delData = function(aid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (aid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(aid)};
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

module.exports = new Activity();