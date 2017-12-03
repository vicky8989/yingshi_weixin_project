var fs = require('fs');
// process.env.OPENSHIFT_NODEJS_PORT

var root = process.env.OPENSHIFT_DATA_DIR
module.exports = function(filename, localpath, cb) {
	console.log('filename: ' + filename);

	if (root) {
		filename = root + filename.slice(5);
	} else {
		filename = localpath + filename;
	}

	fs.readFile(filename, function(err, data) {
		if (err) {
			console.error(err);
			cb(null);
		} else {
			if (cb) {
				cb(data);
			}
		}
	});
};