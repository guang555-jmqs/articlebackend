let UserController={};

let mysqlquery=require('../util/query.js')
let md5=require('md5')
let {secret:passSecret}=require('../config/app.json')

// 解构赋值   
let { delete_success, delete_fail, delete_abnormal, message_err ,updsucc,updfail,issucc,isfail,loginsucc,loginfail} = require('../util/resMesssge.js');

UserController.singin=  async (req,res)=>{
    let {username,password}=req.body;
    // 数据库查询 把密码通过md5加密
    password=md5(`${password}${passSecret}`)
    let sql = `select * from users where username='${username}' and password = '${password}'`
    let data = await mysqlquery(sql);//返回的是[{}]
    if(data.length){
        // 成功
        //把用户信息存入session中
        let userInfo=data[0];
        req.session.userInfo=userInfo
        res.json({errcode:0,message:'登录成功'})
    }else{
        res.json({errcode:1009,message:'用户名或密码错误'})
    }
}
module.exports=UserController