const express = require('express')
const multer = require('multer')
const fs = require('fs')
const sqlQuery = require('../mysql/mysql')
const router = express.Router()

// 配置上传文件目录
const upload = multer({ dest: './public/standardFiles' })

// 全部文件
router.get('/getfiles', async (req, res) => {
  let strSQL = `SELECT * FROM standard_files`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 读文件
router.get('/readfile', async (req, res) => {
  let strSQL = `SELECT url FROM standard_files WHERE file_name LIKE '%${req.query.id}%'`
  const result = await sqlQuery(strSQL)
  
  const data =fs.readFileSync(result[0].url)
  res.contentType("application/pdf")
  res.send(data)
})

// 查找文件
router.get('/findfile', async (req, res) => {
  let strSQL = `SELECT * FROM standard_files WHERE file_name LIKE '%${req.query.keyword}%'`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 打开文件
router.get('/openfile', async (req, res) => {
  let strSQL = `SELECT url FROM standard_files WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  const url = Array.from(result)[0].url
  res.send(url.substr(8))
})

// 上传文件 upload.single('uploadfile') upload.fields([{name:'ppt',maxCount: 10}])
router.post('/upload', upload.any(), (req, res) => {
  for (let file of req.files) {
    let oldPath = file.destination + '/' + file.filename
    let newPath = file.destination + '/' + file.filename + file.originalname
    fs.rename(oldPath, newPath, async (err) => {
      if (err) throw err
      let strSQL = `INSERT INTO standard_files (file_name, url) VALUES (?, ?)`
      const result = await sqlQuery(strSQL, [file.originalname, newPath])
      res.json({ result: Array.from(result) })
    })
  }
})

// 删除文件
router.get('/delete', async (req, res) => {
  // 删除静态文件夹下的文件
  let findSQL = `SELECT url FROM standard_files WHERE id = ${req.query.id}`
  const pathArr = await sqlQuery(findSQL)
  const filePath = Array.from(pathArr)[0].url
  fs.unlink(filePath, (err) => err)
  // 删除数据库中指定数据
  let strSQL = `DELETE FROM standard_files WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  if (!Array.from(result).length) {
    res.json({ result: 'SUCCESS' })
  } else {
    res.json({ result: Array.from(result) })
  }
})

module.exports = router
