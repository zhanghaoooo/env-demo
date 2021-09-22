const express = require('express')
const sqlQuery = require('../mysql/mysql')
const router = express.Router()

/* 用户登录验证 */
router.post('/valid', async (req, res) => {
  const strSQL = `SELECT * FROM user_account WHERE email = '${req.body.email}' AND password = '${req.body.password}'`
  const result = await sqlQuery(strSQL)
  let data = {}
  if (Array.from(result).length) {
    data.user_name = Array.from(result)[0].user_name
    data.role = Array.from(result)[0].role
    data.state = Array.from(result)[0].state
  } else { data = false }
  res.json(data)
})

/* 用户注册 */
router.post('/register', (req, res) => {})

module.exports = router
