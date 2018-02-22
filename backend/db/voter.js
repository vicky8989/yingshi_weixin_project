var dbLink = require('./dblink');
var moment = require('moment');
moment().format();

var Voter = function()
{
    var collection = null;
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('voter');
            if (collection == null) {
                return false;
            }
        }

        return true;
    }

    this.addData = function(voterData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        var data = {
            'openid': voterData.openid,
            'sid': voterData.sid,
            'time': voterData.time
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

    this.queryData = function(openid,sid,callback)
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
			var date_ = moment(new Date()).format('YYYY-MM-DD');			
            var whereStr = {"openid":openid,"sid":sid,"time":date_};
			console.log('getvoter--',whereStr);
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

module.exports = new Voter();