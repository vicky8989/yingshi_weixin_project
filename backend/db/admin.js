var dbLink = require('./dblink');

var Admin = function()
{
    var collection = null;
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('admin');
            if (collection == null) {
                return false;
            }
        }

        return true;
    }

    this.queryData = function(username,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (username==null) {
            return;
        }

        if (username=="") {
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
            var whereStr = {"username":username};
            collection.find(whereStr).toArray(function(err, result) {
                if(err)
				{
				  console.log('Error:'+ err);
				  return;
				}

				if (result.length == 0) 
				{
					callback({"pwd":""});
				}
				else
				{
					callback(result[0]);
				}
            });
        }
    }
	
	this.updateData = function(userdata,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (userdata.username == null) {
            return;
        }

        var whereStr = {"username":(userdata.username)};
        var data = {$set:{
			'admin':'admin',
			'pwd':userdata.pwd
			}};

        collection.update(whereStr,data,{upsert:true,multi:false},function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

};

module.exports = new Admin();