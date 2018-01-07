var File = function()
{
    var multer = require('multer');
    var fs = require('fs');
    var mime = require('mime');
    var imageUrlPath = './production/';
    // var imageUrlPath = 'C://vote//server//production';
    var imageDest = imageUrlPath + 'images/';


    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, imageDest)
        },
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    });

    //添加配置文件到muler对象。
    var upload = multer({
          storage: storage
    });

    this.uploadFile = function(){
        return upload;
    }

    this.readFile = function(image){
        var path = imageDest + image;
        var content = fs.readFileSync(path,"binary");
        return content;
    }

    this.deleteFile = function(image,callback){
        var path = imageDest + image;

        fs.exists(path,function(exists){
            if(exists){
                fs.unlink(path, function(err) {
                    if (err) {
                        callback(err);
                    }
                    callback(image);
                });
            }
            else
            {
                callback("文件不存在");
            }
        });
    }

    this.getImageUrlPath = function(){
        return imageUrlPath;
    }

};

module.exports = new File();