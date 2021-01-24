const express = require('express');

// 得到一个路由器
let router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
//  导入控制器
let Sortcontroller = require('../controller/Sortcontroller.js');
let ArtController = require('../controller/ArtController.js');

// console.log(Sortcontroller);

// 在路由器身上绑定路由
router.get(/^\/$|^\/admin$/, Sortcontroller.admin); 
router.get('/article', Sortcontroller.article); 
router.get('/sort', Sortcontroller.sort);
router.get('/add', Sortcontroller.add);
// 获取所有的分类数据
router.get('/getSort', Sortcontroller.getSort); 
// 获取单条的分类数据
router.get('/getOneCate',Sortcontroller.getOneCate)
router.post('/deleteSort', Sortcontroller.deleteSort); 

// 渲染添加的页面
router.get('/catadd',Sortcontroller.catadd)

// 提交分类的数据
router.post('/postCat',Sortcontroller.postCat)

// 渲染编辑分类的页面
router.get('/catedit',Sortcontroller.catedit)

// 编辑分类的接口
router.post('/updCate',Sortcontroller.updCate)

// 获取文章数据的接口
router.get('/allarticle',ArtController.allArticle)

// 删除文章的接口
router.post('/delArticle',ArtController.delArticle)

// 渲染出添加文章的页面
router.get('/addart',ArtController.artAdd)

// 渲染出编辑文章的页面的接口
router.get('/artedit',ArtController.artEdit)

//提交文章的数据入库
router.post('/postArt',ArtController.postArt)


// 上传文件的接口
router.post('/upload',upload.single('file'),ArtController.upload)

//修改文章的状态
router.post('/updStatus',ArtController.updStatus)

//获取单条文章数据的接口
router.get('/getOneArt',ArtController.getOneArt)


// 匹配失败的的路由
router.all('*',(req,res)=>{
    res.json({errcode:1004,message:'请求错误'})
})

// 暴露路由器
module.exports = router;