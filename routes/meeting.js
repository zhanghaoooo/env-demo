const express = require('express')
const sqlQuery = require('../mysql/mysql')
const router = express.Router()

// 添加会议
router.post('/add', async (req, res) => {
  const data = [req.body.title, req.body.time, req.body.place, req.body.attendee, req.body.content, req.body.orderTime]
  const strSQL= 'INSERT INTO meeting (title, time, place, attendee, content, ordertime) VALUES (?, ?, ?, ?, ?, ?)'
  const result = await sqlQuery(strSQL, data)
  res.json(Array.from(result))
})

// 删除会议
router.get('/delete', async (req, res) => {
  console.log(req.query)
  const strSQL = `DELETE FROM meeting WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json(Array.from(result))
})

// 修改会议
router.post('/edit', async (req, res) => {
  const data = [req.body.title, req.body.time, req.body.place, req.body.attendee, req.body.content]
  const strSQL = `
    UPDATE meeting SET title = ?, time = ?, place = ?, attendee = ?, content = ? WHERE id = ${req.body.id}
  `
  const result = await sqlQuery(strSQL, data)
  res.json(Array.from(result))
})

// 返回未过期的会议
router.get('/allmeeting', async (req, res) => {
  const strSQL = `SELECT * FROM meeting WHERE SUBSTR(ordertime, 1, 8) >= REPLACE(CURDATE(), '-', '') ORDER BY orderTime`
  const result = await sqlQuery(strSQL)
  res.json(Array.from(result))
})

module.exports = router