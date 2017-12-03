(function() {

	// modules
	var formidable = require('formidable'),
		fs = require('fs'),
		util = require('util'),
		path = require('path'),
		fss = require('./fss');

	var root = process.env.OPENSHIFT_DATA_DIR || './data';

	// dofile class
	var dofile = function( params ) {
		var s = this;
		s.p = params;

		var form = new formidable.IncomingForm();

		// 支持多文件上传
		form.multiples = true;
		// 设置默认的上传路径
		form.uploadDir = root + '/tmp';

		if (!fs.existsSync(form.uploadDir)) {
			fss.mkdirs(form.uploadDir);
		};

		form.on('progress',function(br, be) {
			console.log('progress: ' + br / be);
			if (params.progress) {
				params.progress(br / be);
			};
		});

		// formidable parse
		form.parse(params.req, function (err, fields, files) {
			s.parseCallback(err, fields, files);
		});
	};

	dofile.prototype.parseCallback = function(err, fields, files) {
		var s = this;

		// 将上传来的图片
		var result = s.locateFile(err, fields, files);

		if (s.p.callback) {
			s.p.callback(err, fields, files);
		}

		var str = '';
		for (var i = 0; i < result.length; i++) {
			var r = result[i];
			str += r.localfile + ':' + r.serverfile;
			if (i < result.length - 1) {
				str += ',';
			}
		};

		s.p.res.write(str);
		s.p.res.end();

		if (s.p.cb) {
			s.p.cb(this);
		}
	};

	/**
	 * 将上传的文件放入指定的位置: 
	 * ./files/project/forlder/***.***
	 */
	dofile.prototype.locateFile = function(err, fields, files) {
		// 因为真正的files是放在Json的upload里面
		files = files.upload;

		if (!(files instanceof Array)) {
			files = [files];
		}

		// config path
		var project = fields.project || 'general';
		var folder = fields.folder || 'tmp';

		var p = root + '/' + project + '/' + folder + '/';
		if (!fs.existsSync(p)) {
			try{
				fss.mkdirs(p);
			}catch(e) {
				console.log('mkdirs error: ' + p);
			}
		};

		var result = [];

		for (var i = 0; i < files.length ; i++) {
			var f = files[i];
			// get type
			var type = f.name.split('.');
			type = type[type.length - 1];

			// get name
			var name = path.basename(f.path, '.' + type).slice(7);
			try{
				var to = path.join(p,name + '.' + type);
				fs.renameSync(f.path, to);

				result.push({localfile:f.name, serverfile:('/'+project+'/'+folder+'/'+name+'.'+type)});
			}catch(e) {
				console.log('ERROR: fs.renameSync error ' + files[i].name);
				console.log(e);
			}
		};

		return result;
	};

	module.exports = dofile;
})();