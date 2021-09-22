const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const fileRouter = require('./routes/file')
const videoRouter = require('./routes/video')
const standardRouter = require('./routes/standard')
const meetingRouter = require('./routes/meeting')
const questionRouter = require('./routes/question')
const reportRouter = require('./routes/report')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
// 配置请求信息
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('secret'))
// 配置静态路径
app.use(express.static(path.join(__dirname, 'public')))
// 路由组件
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/users', usersRouter)
app.use('/files', fileRouter)
app.use('/video', videoRouter)
app.use('/standard', standardRouter)
app.use('/meeting', meetingRouter)
app.use('/question', questionRouter)
app.use('/report', reportRouter)

// 跨域处理
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'POST, GET')
  // res.header('X-Powered-By', ' 3.2.1')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
