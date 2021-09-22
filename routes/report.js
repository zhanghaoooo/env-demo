const express = require('express')
const multer = require('multer')
const fs = require('fs')
const sqlQuery = require('../mysql/mysql')
const router = express.Router()

// 配置上传报告目录
const upload = multer({ dest: './public/reportFiles' })

// 全部报告
router.get('/reportlist', async (req, res) => {
  let strSQL = `
    SELECT report.id, report.uploader, report.uptime, report.report, report.approve, pic.url
    FROM report LEFT JOIN report_picture pic
    ON report.ident = pic.ident
  ` // WHERE report.approve <= 1
  const result = await sqlQuery(strSQL)
  if(result) result.map(val => {
    if(val.url) {
      val.url = val.url.substr(8)
    }
    val.report = JSON.parse(val.report)
    return val
  })
  res.json({result: Array.from(result)})
})

// 查找报告
router.get('/find', async (req, res) => {
  let strSQL = `
    SELECT * FROM report
    WHERE (report LIKE '%${req.query.keyword}%'
    OR sign LIKE '%${req.query.keyword}%')
    AND report.approve <= 1
  `
  const result = await sqlQuery(strSQL)
  if(result) result.map(val => {
    if(val.url) {
      val.url = val.url.substr(8)
    }
    val.report = JSON.parse(val.report)
    return val
  })
  res.json({result: Array.from(result)})
})

// 审核报告 通过:1   不通过:2
router.get('/approve', async (req, res) => {
  if (req.query.approve === 1) {
    // 添加识别码
    let sign = `课题demo第【${req.query.id.toString().padStart(3, '0')}】号`
    const signSQL = `UPDATE report SET sign = ${sign} WHERE id = ${req.query.id}`
    await sqlQuery(signSQL)
  }
  const strSQL = `UPDATE report SET approve = ${req.query.approve} WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 上传报告 upload.single('uploadfile') upload.fields([{name:'ppt',maxCount: 10}])
router.post('/uploadform', async (req, res) => {
  const strSQL = `INSERT INTO report (uploader, uptime, report, approve) VALUES (?, ?, ?, 0)`
  const dataArr = [req.body.uploader, req.body.uptime, JSON.stringify(req.body.report)]
  const result = await sqlQuery(strSQL, dataArr)
  res.json({ result: Array.from(result) })
})
router.post('/uploadformandfile', upload.any(), async (req, res) => {
  const file = req.files[0]
  let oldPath = file.destination + '/' + file.filename
  let newPath = file.destination + '/' + file.filename + file.originalname
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err
    let strSQL = `INSERT INTO report_picture (ident, url) VALUES (?, ?)`
    sqlQuery(strSQL, [file.filename, newPath])
  })
  const reportSQL = `INSERT INTO report (uploader, uptime, report, ident, approve) VALUES (?, ?, ?, ?, 0)`
  const dataArr = [req.body.uploader, req.body.uptime, req.body.report, file.filename]
  const result = await sqlQuery(reportSQL, dataArr)
  res.json({ result: Array.from(result) })
})

// 删除报告
router.get('/delete', async (req, res) => {
  // 删除静态文件夹下的报告
  let findSQL = `SELECT * FROM report WHERE id = ${req.query.id}`
  const findIdent = await sqlQuery(findSQL)
  const ident = Array.from(findIdent)[0].ident
  const deleteReportSQL = `DELETE FROM report WHERE id = ${req.query.id}`
  
  const findPathSQL = `SELECT * FROM report_picture WHERE ident = ${ident}`
  const pathArr = await sqlQuery(findPathSQL)
  const filePath = null
  if( Array.from(pathArr).length) filePath = Array.from(pathArr)[0].url
  if(filePath) {
    fs.unlink(filePath, (err) => err)
    // 删除数据库中指定数据和文件
    let strSQL = `DELETE FROM report_picture WHERE ident = ${ident}`
    sqlQuery(strSQL)
  }
  const result = await sqlQuery(deleteReportSQL)
  res.json({ result: Array.from(result) })
})

module.exports = router
