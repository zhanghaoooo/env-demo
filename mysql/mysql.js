const { createConnection } = require('mysql')
// 创建链接配置
const connection = createConnection({
  host: 'localhost',
  port: '3306', // 可选，默认3306
  user: 'root',
  password: '1234',
  database: 'cq_env_detection'
})
// 建立连接
connection.connect(err => {
  if(err) {
    console.log(err)
  } else {
    console.log('数据库连接成功')
  }
})
// SQL语句****************************
// 执行查询语句
// const queryAllUsers = `select * from user_account`
// connection.query(queryAllUsers, (err, res, fields) => {
//   if(!err) {
//     console.log(res)
//   } else {
//     console.log(err)
//   }
// })

// 创建库
// const newLib = `create database newLib`
// connection.query(newLib, (err, res) => {
//   if(err) {
//     console.log(err)
//   }
// })

// 删除库
// const deleteLib = `drop database deleteLib`
// connection.query(deleteLib, (err, res) => {
//   if(err) {
//     console.log(err)
//   }
// })

// 删除表
// const deleteTable = `drop table deleteTable`
// connection.query(deleteTable, (err, res) => {
//   if(err) {
//     console.log(err)
//   }
// })

// 创建表
// const newTable = `
//   CREATE TABLE newTable (
//     \`id\` INT NOT NULL AUTO_INCREMENT ,
//     \`colunm1\` varchar(255) NULL ,
//     \`colunm2\` varchar(255) NULL ,
//     \`colunm3\` varchar(255) NULL ,
//     PRIMARY KEY (\`id\`)
//   )`
// connection.query(newTable, (err, res) => {
//   if(err) {
//     console.log(err)
//   }
// })

// 插入数据
// const insertData = `insert into user_account (id, user_name, password, email) values (?, ?, ?, ?)`
// connection.query(insertData, [3,'ww', '1234', '666@163.com'], (err, res) => {
//   if(!err) {
//     console.log(res)
//   } else {
//     console.log(err)
//   }
// })
function sqlQuery(strSQL, arr) {
  return new Promise(function(resolve, reject) {
    connection.query(strSQL, arr, (err, res) => {
      if(err) {
        reject(err)
      }else {
        resolve(res)
      }
    })
  })
}
module.exports = sqlQuery