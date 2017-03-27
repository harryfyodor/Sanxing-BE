export function resHandler (res, data = null, code = 200) {
  res.send({
    'code': code,
    'enmsg': 'ok',
    'cnmsg': '成功',
    'data': data
  })
}

export function errHandler (res, err, code = 500, enmsg = 'server error', cnmsg = '服务器错误') {
  if (err) {
    console.log(err)
  }
  res.send({
    'code': code,
    'enmsg': enmsg,
    'cnmsg': cnmsg,
    'data': null
  })
}

