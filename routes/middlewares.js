import {errHandler} from '../utils/respondUtils'

export function checkLogin (req, res, next) {
  if (req.session.username) {
    next()
  } else {
    errHandler(res, null, 401, 'not login', '请登录后操作')
  }
}

