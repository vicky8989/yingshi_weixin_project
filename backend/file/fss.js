(function() {

	var fs = require('fs');

	/**
	 * nodejs fs 对文件操作的一些补充方法
	 */
	var fss = {};

	/**
	 * 创建路径中的所有文件夹
	 */
	fss.mkdirs = function(path, root) {
	    var dirs = path.split('/'), 
	    	dir = dirs.shift(), 
	    	root = (root||'')+dir+'/';

	    try { 
	    	if (!fs.existsSync(root)) {
	    		fs.mkdirSync(root); 
	    	}
	    } catch (e) {
	        //dir wasn't made, something went wrong
	        if(!fs.statSync(root).isDirectory()) throw new Error(e);
	    }

	    return !dirs.length||fss.mkdirs(dirs.join('/'), root);
	}


	module.exports = fss;

}());