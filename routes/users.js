const express = require('express')
const sqlQuery = require('../mysql/mysql')
const router = express.Router()

/* 查询所有用户信息 */
router.get('/alluser', async (req, res) => {
  let strSQL = `SELECT * FROM user_account`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

/* 查询id用户信息 */
router.get('/userinfo', async (req, res) => {
  let strSQL = `SELECT * FROM user_account WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 更改用户状态
router.get('/changestate', async (req, res) => {
  let strSQL = `UPDATE user_account SET state = ${req.query.state} WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 更改用户角色·
router.get('/changerole', async (req, res) => {
  let strSQL = `UPDATE user_account SET role = '${req.query.role}' WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 添加用户
// userInfo: {user_name: '',password: '',email: ''}
router.post('/add', async (req, res) => {
  let findSQL = `SELECT * FROM user_account WHERE email = '${req.body.email}'`
  const valid = await sqlQuery(findSQL)
  if(!Array.from(valid).length) {
    let strSQL = `INSERT INTO user_account (user_name, password, email, state, role) VALUES (?, ?, ?, 1, 'user')`
    let userInfo = [req.body.user_name, req.body.password, req.body.email] 
    const result = await sqlQuery(strSQL, userInfo)
    res.json({ result: Array.from(result) })
  } else {
    res.json({ errorCode: 1075, reason: '此邮箱已被注册' })
  }
  
})

// 删除用户
router.get('/delete', async (req, res) => {
  let strSQL = `delete FROM user_account WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 修改密码
router.get('/changepwd', async (req, res) => {
  let strSQL = `UPDATE user_account SET password = ${req.query.password} WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

module.exports = router
