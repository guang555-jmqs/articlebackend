// 控制器
// 引入 mysql 数据库 query
let mysqlquery = require('../util/query.js');
// 解构赋值   
let { delete_success, delete_fail, delete_abnormal, mwssage_err } = require('../util/resMesssge.js');

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
    // 删除数据
    deleteSort: async(req, res) => {
        var response;
        let { cate_id } = req.body;
        // console.log(cate_id);
        if (!cate_id) {
            res.json(mwssage_err);
        } else {
            let mysql = `delete from category where cat_id=${cate_id}`;
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


};



// 暴露控制器
module.exports = Sortcontroller;