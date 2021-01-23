// 文章控制器
let ArtController = {}

// 导入模拟(mock)的假数据
let articleData=require('../mockData/article.json')
// 解构赋值   
let { delete_success, delete_fail, delete_abnormal, message_err ,updsucc,updfail,issucc,isfail} = require('../util/resMesssge.js');

let mysqlquery=require('../util/query.js')

// 获取分页的文章数据
ArtController.allArticle = async (req,res)=>{
    // 接收字符串
    let {page,limit:pagesize}=req.query;
    // sql语句
    let offset = (page - 1)*pagesize;//分页算法得出的 当前页码-1 *每页显示的条数
    let sql = `select * from article limit ${offset},${pagesize}`
    let sql2 =`select count(*) as count from article`;
    // let promise1 =  mysqlquery(sql); // [{},{},{}] 返回的数组 里面是对象
    // let data= await mysqlquery(sql);//[{},{},{}] 返回的数组 里面是对象
    let promise1=mysqlquery(sql);
    let promise2=mysqlquery(sql2);
    let result = await Promise.all([promise1,promise2]);
    let data=result[0];
    let count =result[1][0].count
    let response = {
        code:0,
        count :count,
        data:data,
        msg:''
    }
    res.json(response)
}
// 删除文章的数据
ArtController.delArticle = async (req,res)=>{
    let {art_id}=req.body;
    let sql=`delete from article where art_id=${art_id}`;
    let result=await mysqlquery(sql);
    if(result.affectedRows){
        res.json(delete_success)
    }else{
        res.json(delete_fail)
    }
}

// 渲染文章编辑的页面
ArtController.artEdit=(req,res)=>{
    res.render('article-edit.html')
}
// 渲染出文章添加的页面
ArtController.artAdd=(req,res)=>{
    res.render('layui-add.html')
}
// 暴露模块
module.exports=ArtController;