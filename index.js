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

// 上传图片路径的中间件
app.use('uploads',express.static(path.join(__dirname,'uploads')))

// 配置模板的路径
app.set('views', __dirname + '/views/');

// 设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template);

// 使用模板引擎扩展名为html
app.set('view engine', 'html');


// 引入session会话技术
let session = require('express-session');

// 初始化session,定义session一些配置
let options = {
    name:"SESSIONID", // 待会写入到cookie中标识
    secret: "FGVH$#E%&", // 用来加密会话，防止篡改。
    cookie: {
        httpOnly: true,
        secure: false, // false-http(默认), true-https
        maxAge:60000*24, // session在cookies存活24分钟，
        // 再次访问，时间重置为24分钟， 24分钟内只要不访问则会失效
    }
};
app.use( session(options) )

app.use(function(req,res,next){
    // 获取当前访问的路由
    let path =req.path.toLowerCase();
    let noCheckAuth=['/login','/singin','/logout']
    if(noCheckAuth.includes(path)){
        // 需要放行 没有限制
        next()
    }else{
        // 不是发行的路由 需要验证权限
        if(req.session.userInfo){
            // 有权限 继续操作
            next()
        }else{
            res.redirect('/login')
            // next()
        }
    }
});


// 使用路由中间件
app.use(router);


app.listen(4043, () => {
    console.log('server is running at port 4043')
});
