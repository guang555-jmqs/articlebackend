const resMesssge = {
    mwssage_err: { errcode: 1001, message: '参数错误' },
    delete_success: { errcode: 0, message: '删除成功' },
    delete_fail: { errcode: 1002, message: '删除失败' },
    delete_abnormal: { errcode: 1003, message: '服务器繁忙' },
    notfound:{errcode:1004,message:'请求错误'}
};
// 暴露给 module 模块
module.exports = resMesssge;