
// 当前日期
function getTime () {
  let date = new Date()
  let year = date.getFullYear()
  let month = (date.getMonth() + 1).toString().padStart(2, '0')
  let day = date.getDate().toString().padStart(2, '0')
  let time = year + '/' + month + '/' + day
  return time
}

module.exports = { getTime }
