const router = require('koa-router')();
const multer = require('koa-multer');

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//加载配置
var upload = multer({storage: storage});

router.post('/user/avatar', upload.single('file'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename // 返回文件名
    }
});

module.exports = router;
