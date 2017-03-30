import express from 'express'
import UserModel from '../models/user'
import QuestionModel from '../models/question'
import AnswerModel from '../models/answer'
import crypto from 'crypto'
import { resHandler, errHandler } from '../utils/respondUtils'
import { checkLogin } from './middlewares'

let router = express.Router()

function sha256 (text) {
  return crypto.createHash('sha256').update(text).digest('hex')
};

let salt = 'sanxing'

// 注册功能
router.post('/', async function (req, res, next) {
  try {
    let username = req.body.username
    let password = req.body.password

    // 校验
    if (!(username.length >= 1 && username.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符');
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符');
    }
    
    password = sha256(username + password + salt)

    let user = await UserModel.signUp(username, password)
    resHandler(res, user, 201)
  } catch (err) {
    if (err.code === 11000) {  // index重复了
      errHandler(res, err, 400, 'duplicate username', '用户名已被注册')
    } else {
      errHandler(res, err)
    }
  }
})

// 登录功能
router.post('/session', async function (req, res, next) {
  try {
    let username = req.body.username
    let password = sha256(username + req.body.password + salt)
    let user = await UserModel.getUser(username)
    // 未注册过
    if (!user) {
      return errHandler(res, null, 400, 'not sign up', '您还没有注册过')
    } else if (user.password === password) {
      req.session.username = username
      req.session._id = user._id
      resHandler(res)
    } else {  // 密码错误
      errHandler(res, null, 400, 'wrong password', '密码错误')
    }
  } catch (err) {
    errHandler(res, err)
  }
})

// 登录功能
router.post('/session', async function (req, res, next) {
  try {
    let username = req.body.username
    let password = sha256(username + req.body.password + salt)
    let user = await UserModel.getUser(username)
    // 未注册过
    if (!user) {
      return errHandler(res, null, 400, 'not sign up', '您还没有注册过')
    } else if (user.password === password) {
      req.session.username = username
      req.session._id = user._id
      resHandler(res)
    } else {  // 密码错误
      errHandler(res, null, 400, 'wrong password', '密码错误')
    }
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取会话信息
router.get('/session', checkLogin, async function (req, res, next) {
  try {
      let user = await UserModel.getUser(req.session.username)
      delete user.password
      resHandler(res, user, 200)
  } catch (err) {
    errHandler(res, err)
  }
})

// 登出功能
router.delete('/session', checkLogin, async function (req, res, next) {
  try {
    req.session.destroy(function (err) {
      if (err) throw err
      resHandler(res)
    })
  } catch (err) {
    errHandler(res, err)
  }
})

// 修改密码
router.put('/password', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let oldPassword = sha256(username + req.body.oldPassword + salt)
    let newPassword = sha256(username + req.body.newPassword + salt)
    
    let user = await UserModel.changeUserPassword(username, oldPassword, newPassword)

    if (user) {
      resHandler(res, user.password)
    } else {
      errHandler(res, null, 400, 'wrong password', '密码错误')
    }
  } catch (err) {
    errHandler(res, err)
  }
})

// 设置标签
router.put('/tags', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let tags = req.body.tags

    let user = await UserModel.setTags(username, tags)

    resHandler(res, user.tags)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取标签
router.get('/tags', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username

    let tags = (await UserModel.getUser(username, 'tags')).tags

    resHandler(res, tags)
  } catch (err) {
    errHandler(res, err)
  }
})

router.post('/favorite/questions', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let questionId = req.body.questionId
    let user = await UserModel.addLikeQuestion(username, questionId)
    await QuestionModel.changeLikeCounter(questionId, 1)
    resHandler(res, user.favoriteQuestions, 201)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/favorite/questions', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let questions = await QuestionModel.getLikeQuestions(username)
    resHandler(res, questions)
  } catch (err) {
    errHandler(res, err)
  }
})

router.delete('/favorite/questions/:questionId', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let questionId = req.params.questionId
    await UserModel.deleteLikeQuestion(username, questionId)
    await QuestionModel.changeLikeCounter(questionId, -1)
    resHandler(res, null, 204)
  } catch (err) {
    errHandler(res, err)
  }
})

router.post('/favorite/answers', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let answerId = req.body.answerId
    let user = await UserModel.addLikeAnswer(username, answerId)
    await AnswerModel.changeLikeCounter(answerId, 1)
    resHandler(res, user.favoriteAnswers, 201)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/favorite/answers', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let answers = await AnswerModel.getLikeAnswers(username)
    resHandler(res, answers)
  } catch (err) {
    errHandler(res, err)
  }
})

router.delete('/favorite/answers/:answerId', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let answerId = req.params.answerId
    await UserModel.deleteLikeAnswer(username, answerId)
    await AnswerModel.changeLikeCounter(answerId, -1)
    resHandler(res, null, 204)
  } catch (err) {
    errHandler(res, err)
  }
})

export default router
