let UserController={};

let mysqlquery=require('../util/query.js')
let md5=require('md5')
let {secret:passSecret}=require('../config/app.json')

// 解构赋值   
let { delete_success, delete_fail, delete_abnormal, message_err ,updsucc,updfail,issucc,isfail,loginsucc,loginfail} = require('../util/resMesssge.js');

//登录接口
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
        console.log(userInfo);
        // 更新此次的登录时间 set更新条件  users表名
        let sql = `update users set last_login_date=now() where user_id=${userInfo.user_id}`;
        await mysqlquery(sql)
        res.json({errcode:0,message:'登录成功',userInfo})
    }else{
        res.json({errcode:1009,message:'用户名或密码错误'})
    }
}


// 更新用户头像
UserController.updateAvatar = async (req,res)=>{
    let {avatar} = req.body;
    let user_id = req.session.userInfo.user_id;
    let sql = `update users set avatar = '${avatar}' where user_id = ${user_id}`
    let result = await model(sql)
    if(result.affectedRows){
        // 成功
        res.json({code:0,message:"修改头像成功"})
    }else{
        res.json({code:1,message:"修改头像失败"})
    }
}

module.exports=UserController