const resMesssge = {
    message_err: { errcode: 1001, message: '参数错误' },
    delete_success: { errcode: 0, message: '删除成功' },
    delete_fail: { errcode: 1002, message: '删除失败' },
    delete_abnormal: { errcode: 1003, message: '服务器繁忙' },
    notfound:{errcode:1004,message:'请求错误'},
    updsucc:{errcode:0,message:'获取成功'},
    updfail:{errcode:1005,message:'获取失败'},
    issucc:{errcode:0,message:'编辑成功'},
    isfail:{errcode:0,message:'编辑失败'},
    loginsucc:{erroode:0,message:'登录成功'},
    loginfail:{errcode:0,message:'用户名或者密码错误'}

};
// 暴露给 module 模块
module.exports = resMesssge;