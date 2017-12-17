var voteActivity = require('./db/activity');

var now = new Date();
var jsonDate = now.toJSON();
var then = new Date(jsonDate);

var userData = {
    'name': "第一个活动",
    'start': jsonDate,
    'end': jsonDate,
    'status': 0,
    'des': "测试用的呗 哎 不好整"
};

var aid = "5a35fb2c889ea90f4e224437";

var updateData = {
    'status': 1,
    'des': "测试用的啊 哎 不好整"
};

voteActivity.addData(userData, function(result,uid){
		//打印错误信息
		console.log(result);

        // voteUser.delData(aid, function(result){
    
        //     console.log(result);
        // });     
        // 

        // voteActivity.updateData(aid,updateData,function(result){
            
        //     console.log(result);
        // });  

        //查找所有 如果传入ID 查找一个
        voteActivity.queryData("", function(result){
            
            console.log(result);
        });   

        // voteActivity.queryData("5a35fb2c889ea90f4e224437", function(result){
            
        //     console.log(result);
        // });   
});	

