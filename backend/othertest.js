var file = require('./file/file');


var image = 'c1d472a49374ca1949e93b157a693d66';
file.deleteFile(image,function(result){

	if (result)
		console.log(result);
});