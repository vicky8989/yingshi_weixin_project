var File = function()
{
    var multer = require('multer');
    var fs = require('fs');
    var mime = require('mime');
    var dest = './production/images/';

    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, dest)
        },
    });

    //添加配置文件到muler对象。
    var upload = multer({
          storage: storage
    });

    //如需其他设置，请参考multer的limits,使用方法如下。
    //var upload = multer({
    //    storage: storage,
    //    limits:{}
    // });

    this.uploadFile = function(){
        return upload;
    }

    this.readFile = function(image){
        var path = dest + image;
        var content = fs.readFileSync(path,"binary");
        return content;
    }

    this.deleteFile = function(image,callback){
        var path = dest + image;

        fs.unlink(path, function(err) {
            if (err) {
                callback(err);
            }
            callback(image);
        });
    }

};

module.exports = new File();