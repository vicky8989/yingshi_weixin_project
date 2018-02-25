var dbLink = require('./dblink');
var Map = require('../common/map');

var User = function()
{
    var ObjectId = require('mongodb').ObjectID;
    var codeMap = new Map;
    var collection = null;
    
    this.collection = function(){

        if (collection == null) {
            collection = dbLink.collection('signer');
            if (collection == null) {
                return false;
            }
        }

        return true;
    }

    this.calcCode = function(signers){
	
		var maxCode = 0;
		for (var i=0,ilen = signers.length; i< ilen; i++) {

			var signer = signers[i];
			if(maxCode < signer.code) {
				maxCode = signer.code;
			}
		}
		
		maxCode += 1;
		
		console.log('maxcode',maxCode);
		return maxCode; //获取最大的code
		
        if (codeMap.isEmpty()) {
            var signers = collection.find().toArray();
            for (var i=0 ; i<signers.length; i++) {

                var signer = signers[i]
				if(codeMap.get(signer.aid) == null) codeMap.put(signer.aid, 1);
				
                if(codeMap.get(signer.aid)<signer.code){
					codeMap.get(signer.aid) = signer.code;
				}
            }
        }

        var code = codeMap.get(aid);
        if (code != null) {
            code ++;
            codeMap.put(aid,code);
            return codeMap.get(aid);
        }
        else{
            codeMap.put(aid, 1);
            return 1;
        }
    }

    this.addData = function(userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (userData.aid == null) {
            return;
        }
		
		var this_ = this;
		this.queryDataByAid(userData.aid,function(signers){
			var data = {
				'aid':userData.aid,
				'openid': userData.openid,
				'name': userData.name ,
				'phone': userData.phone,
				'address': userData.address,
				'words': userData.words,
				'hot': userData.hot,
				'votenum': userData.votenum,
				'pics': userData.pics,
				'status':userData.status
			};

			data.code = this_.calcCode(signers);
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

    this.updateData = function(sid,userData,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (sid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(sid)};
        var data = {$set:{
            'aid':userData.aid,
            'openid': userData.openid,
            'name': userData.name ,
            'phone': userData.phone,
            'address': userData.address,
            'words': userData.words,
            'hot': userData.hot,
            'votenum': userData.votenum,
            'pics': userData.pics,
            'status':userData.status}};

        collection.update(whereStr,data,function(err, result) { 
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.queryData = function(sid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (sid==null) {
            return;
        }

        if (sid=="") {
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
            var whereStr = {"_id":ObjectId(sid)};
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

    this.queryDataByAid = function(aid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (aid == null) {
            return;
        }

        var whereStr = {"aid":aid};
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.queryDataByAidAndOpenid = function(aid,openid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (aid == null || openid== null) {
            return;
        }

        var whereStr = {"aid":aid,"openid":openid};
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
              console.log('Error:'+ err);
              return;
            }

            callback(result);
        });
    }

    this.delData = function(sid,callback)
    {
        if (this.collection() == false) {
            return;
        }

        if (sid == null) {
            return;
        }

        var whereStr = {"_id":ObjectId(sid)};
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