const express = require('express')
const multer = require('multer')
const fs = require('fs')
const sqlQuery = require('../mysql/mysql')
const { getTime } = require('../public/javascripts/common')
const router = express.Router()

// 配置上传文件目录
const upload = multer({ dest: './public/uploadFiles' })

// 全部文件
router.get('/filelist', async (req, res) => {
  let strSQL = `SELECT * FROM files ORDER BY id DESC`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 查找文件
router.get('/findfile', async (req, res) => {
  let strSQL
  // 通过id查找
  if (req.query.hasOwnProperty('id')) {
    strSQL = `SELECT * FROM files WHERE id = ${req.query.id} ORDER BY id DESC`
  }
  // 模糊搜索
  if (req.query.hasOwnProperty('keyword')) {
    strSQL = `SELECT * FROM files WHERE file_name LIKE '%${req.query.keyword}%' ORDER BY id DESC`
  }

  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 打开文件
router.get('/openfile', async (req, res) => {
  let strSQL = `SELECT localdownload FROM files WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  const url = Array.from(result)[0].localdownload
  // res.send(`<a href="http://192.168.110.84:8766${url.slice(8)}">打开</a>`)
  res.json({ url: url.slice(8) })
})

// 上传文件 upload.single('uploadfile') upload.fields([{name:'ppt',maxCount: 10}])
router.post('/upload', upload.any(), (req, res) => {
  for (let file of req.files) {
    let oldPath = file.destination + '/' + file.filename
    let newPath = file.destination + '/' + file.filename + file.originalname
    fs.rename(oldPath, newPath, async (err) => {
      if (err) throw err
      let strSQL = `INSERT INTO files (file_name, uploader, localdownload, uptime) VALUES (?,?,?,?)`
      // let time = getTime()
      let fileInfo = [
        file.originalname,
        req.body.uploader,
        newPath,
        req.body.uptime
      ]
      const result = await sqlQuery(strSQL, fileInfo)
      res.json({ result: Array.from(result) })
    })
  }
})

// 下载文件
router.get('/download', async (req, res) => {
  let strSQL = `SELECT localdownload FROM files WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  const downloadURL = Array.from(result)[0].localdownload
  res.send(downloadURL.substr(8))
})

// 删除文件
router.get('/delete', async (req, res) => {
  // 删除静态文件夹下的文件
  let findSQL = `SELECT localdownload FROM files WHERE id = ${req.query.id}`
  const pathArr = await sqlQuery(findSQL)
  const filePath = Array.from(pathArr)[0].localdownload
  fs.unlink(filePath, err => err)
  // 删除数据库中指定数据
  let strSQL = `DELETE FROM files WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  if (!Array.from(result).length) {
    res.json({ result: 'SUCCESS' })
  } else {
    res.json({ result: Array.from(result) })
  }
})

module.exports = router
