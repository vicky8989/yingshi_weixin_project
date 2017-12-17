var voteActivity = require('./db/activity');
var voteActivityInfo = require('./db/activityInfo');
var voteAwards = require('./db/awards');

var now = new Date();
var jsonDate = now.toJSON();

var userData = {
    'name': "第一个活动",
    'start': jsonDate,
    'end': jsonDate,
    'status': 0,
    'des': "第一个活动的描述"
};

now = new Date();
jsonDate = now.toJSON();

var userDataInfo = {
    'enrolStart': jsonDate,
    'enrolEnd': jsonDate,
    'voteStart': jsonDate,
    'voteEnd': jsonDate,
    'info': "第一个活动的详细信息",
    'banner': ["第一个活动的图URL0","第一个活动的图URL1","第一个活动的图URL2"],
    'rule': "第一个活动的规则"
};

var userDataAwards = {
    'name': "一等奖",
    'num': 1,
    'prizeInfo': "文房四宝一套" ,
    'prizeImg': "奖品图片URL",
    'info': "得了一等奖才能拿到呦"
};

var aid = "5a35fb2c889ea90f4e224437";

voteActivity.addData(userData, function(result,aid){

        console.log(result);

        userDataInfo.aid = uid;
		voteActivityInfo.addData(userDataInfo,function(result,aid){

            console.log(result);
        });

        userDataAwards.aid = uid;   
        voteAwards.addData(userDataAwards,function(result,aid){

            console.log(result);
        });
});	

