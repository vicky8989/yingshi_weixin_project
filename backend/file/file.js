var File = function()
{
    var multer = require('multer');

    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, './production/images/')
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

    this.upload = function(){
        return upload;
    }
};

module.exports = new File();