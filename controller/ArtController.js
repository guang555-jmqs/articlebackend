// 文章控制器
let ArtController = {}
const fs=require('fs')
// 导入模拟(mock)的假数据
let articleData=require('../mockData/article.json')
// 解构赋值   
let { delete_success, delete_fail, delete_abnormal, message_err ,updsucc,updfail,issucc,isfail} = require('../util/resMesssge.js');

let mysqlquery=require('../util/query.js')

// 获取分页的文章数据
ArtController.allArticle = async (req,res)=>{
    // 接收字符串
    let {page,limit:pagesize,title,status}=req.query;
    // 定义查询条件
    let where='where 1';
    // 有值 才拼接查询条件
    title && (where += ` and t1.title like '%${title}%'`)
    status && (where += ` and t1.status='${status}'`)
    // sql语句
    let offset = (page - 1)*pagesize;//分页算法得出的 当前页码-1 *每页显示的条数
    // let sql = `select * from article order by art_id desc limit ${offset},${pagesize}`
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cat_id 
                ${where}
                order by art_id desc limit ${offset},${pagesize}`;

    let sql2 =`select count(*) as count from article t1 ${where}`;
    // let promise1 =  mysqlquery(sql); // [{},{},{}] 返回的数组 里面是对象
    // let data= await mysqlquery(sql);//[{},{},{}] 返回的数组 里面是对象
    let promise1=mysqlquery(sql);
    let promise2=mysqlquery(sql2);
    // 并行
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
    // let data={
    //     userInfo:req.session.userInfo
    // }
    res.render('layui-add.html')
}

// 文章数据入库
ArtController.postArt = async (req,res)=>{
    let {title,cat_id,status,content,cover}=req.body;
    let username=req.session.userInfo.username
    let sql = `insert into article(title,content,author,cat_id,status,cover,publish_date) 
                values('${title}','${content}','${username}','${cat_id}','${status}','${cover}',now())`
    let result= await mysqlquery(sql);
    if(result.affectedRows){
        res.json(issucc)
    }else{
        res.json(isfail)
    }
}

//实现文件上传
ArtController.upload = (req,res)=>{
    // console.log(req.file); //接收文件上传成功后的信息
    if(req.file){
        // 进行文件的重命名即可 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({message:'上传成功',code: 0,src:newPath})
        })
    }else{
        res.json({message:'上传失败',code: 1,src:''})
    }
}

// 修改文章的状态
ArtController.updStatus= async (req,res)=>{
    let {art_id,status}=req.body;
    let sql=`update article set status = ${status} where art_id = ${art_id}`;
    let result=await mysqlquery(sql);
    if(result.affectedRows){
        res.json(issucc)
    }else{
        res.json(isfail)
    }
}

// 获取单条文章
ArtController.getOneArt= async (req,res)=>{
    let {art_id}=req.query;
    let sql = `select * from article where art_id =${art_id}`;
    let data= await mysqlquery(sql);
    res.json(data[0] || {})//如果是空就返回一个空对象 不会报错
}

// 编辑文章数据入库
ArtController.updArt= async (req,res)=>{
    // 接收post参数
    let {cover,title,cat_id,art_id,content,status,oldImg}=req.body
    //执行sql语句
    let sql;
    if(cover){
        sql=`update article set title='${title}',content='${content}',cover='${cover}',cat_id=${cat_id}
        ,status=${status} where art_id=${art_id};`
    }else{
        sql=`update article set title='${title}',content='${content}',cat_id=${cat_id}
        ,status=${status} where art_id=${art_id};`
    }
    let result=await mysqlquery(sql)
    //响应结果
    if(result.affectedRows){
        cover&&fs.unlinkSync(oldImg)
        res.json(issucc)
    }else{
        res.json(isfail)
    }
}
// 暴露模块
module.exports=ArtController;