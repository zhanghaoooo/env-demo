const express = require('express')
const multer = require('multer')
const fs = require('fs')
const sqlQuery = require('../mysql/mysql')
const { getTime } = require('../public/javascripts/common')
const router = express.Router()

// 配置上传视频目录
const upload = multer({ dest: './public/video' })

// 全部视频
router.get('/videolist', async (req, res) => {
  let strSQL = `SELECT * FROM videos ORDER BY id DESC`
  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 查找视频
router.get('/findvideo', async (req, res) => {
  let strSQL
  // 通过id查找
  if (req.query.hasOwnProperty('id')) {
    strSQL = `SELECT * FROM videos WHERE id = ${req.query.id} ORDER BY id DESC`
  }
  // 模糊搜索
  if (req.query.hasOwnProperty('keyword')) {
    strSQL = `SELECT * FROM videos WHERE videoname LIKE '%${req.query.keyword}%' ORDER BY id DESC`
  }

  const result = await sqlQuery(strSQL)
  res.json({ result: Array.from(result) })
})

// 在线播放
router.get('/openfile', async (req, res) => {
  let strSQL = `SELECT url FROM videos WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)


})

// 上传视频 upload.single('uploadfile') upload.fields([{name:'ppt',maxCount: 10}])
router.post('/upload', upload.any(), (req, res) => {
  for (let file of req.files) {
    let oldPath = file.destination + '/' + file.filename
    let newPath = file.destination + '/' + file.filename + file.originalname
    fs.rename(oldPath, newPath, async (err) => {
      if (err) throw err
      let strSQL = `INSERT INTO videos (videoname, uploader, url, uptime) VALUES (?,?,?,?)`
      let time = getTime()
      let fileInfo = [
        file.originalname,
        req.body.uploader,
        newPath,
        time
      ]
      const result = await sqlQuery(strSQL, fileInfo)
      res.json({ result: Array.from(result) })
    })
  }
})

// 下载视频
router.get('/download', async (req, res) => {
  let strSQL = `SELECT url FROM videos WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  const downloadURL = Array.from(result)[0].url
  res.send(downloadURL.substr(8))
})

// 删除视频
router.get('/delete', async (req, res) => {
  // 删除静态视频夹下的视频
  let findSQL = `SELECT url FROM videos WHERE id = ${req.query.id}`
  const pathArr = await sqlQuery(findSQL)
  const filePath = Array.from(pathArr)[0].url
  fs.unlink(filePath, err => err)
  // 删除数据库中指定数据
  let strSQL = `DELETE FROM videos WHERE id = ${req.query.id}`
  const result = await sqlQuery(strSQL)
  if (!Array.from(result).length) {
    res.json({ result: 'SUCCESS' })
  } else {
    res.json({ result: Array.from(result) })
  }
})

module.exports = router
