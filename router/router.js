const express = require('express');

// 得到一个路由器
let router = express.Router();

//  导入控制器
let Sortcontroller = require('../controller/Sortcontroller.js');
// console.log(Sortcontroller);

// 在路由器身上绑定路由
router.get(/^\/$|^\/admin$/, Sortcontroller.admin); 
router.get('/article', Sortcontroller.article); 
router.get('/sort', Sortcontroller.sort);
router.get('/add', Sortcontroller.add);
router.get('/getSort', Sortcontroller.getSort); 
router.post('/deleteSort', Sortcontroller.deleteSort); 

// 渲染添加的页面
router.get('/catadd',Sortcontroller.catadd)

// 提交分类的数据
router.post('/postCat',Sortcontroller.postCat)

// 匹配失败的的路由
router.all('*',(req,res)=>{
    res.json({errcode:1004,message:'请求错误'})
})

// 暴露路由器
module.exports = router;