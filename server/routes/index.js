var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    /**
     * 接受两个参数，第一个是模板的名称，即 views 目录下的模板文件名，扩展名 .ejs 可选
     * 第二个参数是传递给模板的数据对象
     */
    res.render('index', {title: 'Express'});
});

module.exports = router;
