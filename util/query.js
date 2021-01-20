const mysql = require('mysql');

let mysql_configure = require('../config/mysql_configure.json');

// 1.连接mysql数据库  createConnection() 配置参数
var joinData = mysql.createConnection({
    // 展开参数
    ...mysql_configure
});

// 连接mysql数据
joinData.connect(err => {
    if (err) {
        throw err;
    }
    console.log('connection is successful');
});

function mysqlquery(sql) {
    return new Promise((resolve, reject) => {
        joinData.query(sql, (err, result) => {
            if (err) reject(err);
            // selcte查询时  result 是一个数组 result.length > 0  有数据
            // insert delete update 增删改时  result 是一个对象  result.affectedRows > 0 说明操作成功
            resolve(result);
        });
    })
}
// 暴露给 module 模块
module.exports = mysqlquery;