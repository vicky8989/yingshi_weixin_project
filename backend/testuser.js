var voteUser = require('./db/user');

var userData = {
    'openid': "0xadcbf2324460caddefe",
    'nickname': "嘿嘿嘿",
    'headimgurl': "img/develop/js/js_ban@2x.png",
    'sex': "male",
    'language': "CHS",
    'city': "beijing",
    'province': "userData.province",
    'country': "userData.country",
    'name':"userData.name",
    'phone':"userData.phone",
    'adress':"userData.adress"
};

var updateData = {
    'openid': "0xaaaaaaabbbbbbcdfeb2"
};


voteUser.addData(userData, function(result,uid){
		//打印错误信息
		console.log(result);

        // voteUser.delData(uid, function(result){
    
        //     console.log(result);
        // });     

        voteUser.updateData(uid,updateData,function(result){
            
            console.log(result);
        });  

        // voteUser.queryData("0xadcbf2324460caddefe", function(result){
            
        //     console.log(result);
        // });   
});	

