const express = require('express')
const sqlQuery = require('../mysql/mysql')
const router = express.Router()

// 添加问题 选择题
router.post('/addcq', async (req, res) => {
  const data = [req.body.title, JSON.stringify(req.body.options), req.body.isEditable]
  const strSQL= 'INSERT INTO question_choice (title, options, isEditable) VALUES (?, ?, ?)'
  const result = await sqlQuery(strSQL, data)
  res.json({ result: Array.from(result) })
})

// 添加问题 问答题
router.post('/addeq', async (req, res) => {
  const data = [req.body.title, req.body.answer, req.body.isEditable]
  const strSQL= 'INSERT INTO question_essay (title, answer, isEditable) VALUES (?, ?, ?)'
  const result = await sqlQuery(strSQL, data)
  res.json({ result: Array.from(result) })
})

// 删除问题 选择题
router.get('/deletecq', async (req, res) => {
  const strSQL = `DELETE FROM question_choice WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 删除问题 问答题
router.get('/deleteeq', async (req, res) => {
  const strSQL = `DELETE FROM question_essay WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 修改问题 选择题
router.post('/updatecq', async (req, res) => {
  const data = [req.body.title, JSON.stringify(req.body.options)]
  const strSQL = `
    UPDATE question_choice SET title = ?, options = ? WHERE id = ${req.body.id}
  `
  const result = await sqlQuery(strSQL, data)
  res.json({ result: Array.from(result) })
})

// 修改问题 问答题
router.post('/updateeq', async (req, res) => {
  const data = [req.body.title, req.body.answer]
  const strSQL = `
    UPDATE question_essay SET title = ?, answer = ? WHERE id = ${req.body.id}
  `
  const result = await sqlQuery(strSQL, data)
  res.json({ result: Array.from(result) })
})

// 返回全部问题
router.get('/allquestion', async (req, res) => {
  const cqSQL = `SELECT * FROM question_choice`
  const eqSQL = `SELECT * FROM question_essay`
  const cqResult = await sqlQuery(cqSQL)
  const eqResult = await sqlQuery(eqSQL)
  if (cqResult) cqResult.map(val => val.options = JSON.parse(val.options))
  res.json({ question_choice: cqResult, question_essay: eqResult })
})

// 随机问题
router.get('/randquestion', async (req, res) => {
  const cqSQL = `SELECT * FROM question_choice ORDER BY RAND() LIMIT 5`
  const eqSQL = `SELECT * FROM question_essay ORDER BY RAND() LIMIT 2`
  const cqResult = await sqlQuery(cqSQL)
  const eqResult = await sqlQuery(eqSQL)
  if (cqResult) cqResult.map(val => val.options = JSON.parse(val.options))
  res.json({ question_choice: cqResult, question_essay: eqResult })
})

module.exports = router