const express = require('express');

// 得到一个路由器
let router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
//  导入控制器
let Sortcontroller = require('../controller/Sortcontroller.js');
let ArtController = require('../controller/ArtController.js');
let UserController=require('../controller/UserController.js')

let mysqlquery=require('../util/query.js')


// 统计出分类的文章总数
router.get('/cateCount',async (req,res)=>{
    let sql = `select count(*) total ,t2.name,t1.cat_id from article t1 
                left join category t2 
                on t1.cat_id = t2.cat_id 
                group by  t1.cat_id`;
    let data = await mysqlquery(sql); // [{},{},{},{}]
    res.json(data)
})

// 统计当前的每月的文章总数
router.get('/artCount',async (req,res)=>{
    let sql=`select month(publish_date) month,count(*) as total from article
    where year(publish_date)=year(now()) group by month(publish_date)`
    let data = await mysqlquery(sql);
    res.json(data)
})
// console.log(Sortcontroller);

// 在路由器身上绑定路由
// router.get(/^\/$|^\/admin$/, Sortcontroller.admin); 
router.get(/^\/$|^\/admin$/, (req,res)=>{
    // let data={
    //     userInfo:req.session.userInfo
    // }
    res.render('layui-admin.html')
}); 

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

//编辑文章的数据接口
router.post('/updArt',ArtController.updArt)

// 系统登录的页面
router.get('/login',(req,res)=>{
        // 如果有用户信息 用户再次访问 直接重定向到首页
        if(req.session.userInfo){
            res.redirect('/');
            return;
        }
    res.render('login.html')
})

// 登录系统的接口
router.post('/singin',UserController.singin)

// 退出登录系统的接口
router.get('/logout',(req,res)=>{
    // 清空session并重定向到登录页面
    req.session.destroy(err=>{
        if(err){throw err;}
    })
    res.json({message:'退出成功'})
})

// 匹配失败的的路由
router.all('*',(req,res)=>{
    res.json({errcode:1004,message:'请求错误'})
})

// 暴露路由器
module.exports = router;