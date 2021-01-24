// 控制器
// 引入 mysql 数据库 query
const mysqlquery=require('../util/query.js')
// 解构赋值   
let { delete_success, delete_fail, delete_abnormal, message_err ,updsucc,updfail,issucc,isfail} = require('../util/resMesssge.js');

let Sortcontroller = {
    // 展示 admin页面
    admin: (req, res) => {
        res.render('layui-admin.html');
    },
    // 展示 layui-article 页面
    article: (req, res) => {
        res.render('layui-article.html');
    },
    // 展示 layui-sort 页面
    sort: (req, res) => {
        res.render('layui-sort.html');
    },
    // 展示 layui-add 页面
    add: (req, res) => {
        res.render('layui-add.html');
    },
    // 获取分类表数据
    getSort: async(req, res) => {
        let sql = 'select * from category order by sort';
        let result = await mysqlquery(sql);
        res.json(result);
    },
    // 获取单条数据
    getOneCate: async(req, res) => {
        // 1.接收参数
        let {cat_id}=req.query
        if(!cat_id){
            res.json(message_err)
        }else{
            // 查询数据库
            let sql=`select * from category where cat_id=${cat_id}`
            // 返回数据
            let data = await mysqlquery(sql);
            if(data){
                data[0].errcode=0;
                res.json(data[0])
            }else{
                res.json(updfail)
            }
        }
    },

    // 实现编辑的入库
    updCate:  async (req,res)=>{
        // 接收参数
        let {cat_id,name,sort,add_date}=req.body
        if(!cat_id){
            res.json(message_err);
            return
        }
        // 编写sql语句
        let sql=`update category set name='${name}',sort=${sort},add_date='${add_date}' where cat_id=${cat_id}`;
        let result=await mysqlquery(sql)
        // 返回结果
        if(result.affectedRows){
            res.json(issucc)
        }else{
            res.json(isfail)
        }
      
    },



    // 删除数据
    deleteSort: async(req, res) => {
        var response;
        let { cat_id } = req.body;
        console.log(cat_id);
        if (!cat_id) {
            res.json(message_err);
        } else {
            let mysql = `delete from category where cat_id=${cat_id}`;
            try {
                var result = await mysqlquery(mysql);
                if (result.affectedRows) {
                    response = delete_success;
                } else {
                    response = delete_fail;
                }
            } catch (err) {
                console.log(err);
                response = delete_abnormal;
            }
        };
        res.json(response);
    },

        // 展示添加分类的页面
    catadd:(req,res)=>{
        res.render('category-add.html')
    },
    postCat: async (req,res)=>{
        let {name,sort,add_date}=req.body;
        console.log(name,sort,add_date)
        let sql=`insert into category(name,sort,add_date) values('${name}',${sort},'${add_date}')`
        console.log(sql)
        let result= await mysqlquery(sql);
        console.log(result)
        if(result.affectedRows){
            res.json({errcode:0,message:'添加成功'})
        }else{
            res.json({errcode:1006,message:'添加失败'})
        }
    },

    catedit:(req,res)=>{
        res.render('category-edit.html')
    }


};



// 暴露控制器
module.exports = Sortcontroller;