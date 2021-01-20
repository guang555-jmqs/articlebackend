const express = require('express');
const path = require('path');
const artTemplate = require('art-template');
const express_template = require('express-art-template');
// const mysql = require('mysql');

const app = express();
// 导入路由模块
let router = require('./router/router.js');


// 托管静态资源
app.use(express.static(path.join(__dirname)));

// 设置中间件，获取post请求参数
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 配置模板的路径
app.set('views', __dirname + '/views/');

// 设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template);

// 使用模板引擎扩展名为html
app.set('view engine', 'html');

// 使用路由中间件
app.use(router);


app.listen(4043, () => {
    console.log('server is running at port 4043')
});
