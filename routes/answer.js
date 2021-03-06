import express from 'express'
import AnswerModel from '../models/answer'
import QuestionModel from '../models/question'
import { resHandler, errHandler } from '../utils/respondUtils'
import { checkLogin } from './middlewares'

let router = express.Router()

// 提交回答
router.post('/', checkLogin, async function (req, res, next) {
  try {
    req.body.answerer = {
      username: req.session.username,
      avatar: req.session.avatar
    }
    let answer = await AnswerModel.addAnswer(req.body)
    // set answered if it's a today question
    let todayQuestion = await QuestionModel.getTodayQuestionByQuestionId(req.session.username, req.body.questionId)
    if (todayQuestion) {
      await QuestionModel.setAnswered(todayQuestion._id, answer._id)
    }
    resHandler(res, answer, 201)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取回答历史
router.get('/history', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let answers = await AnswerModel.getAnswerHistory(username)
    resHandler(res, answers)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取每日回答
router.get('/daily', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let answers = await AnswerModel.getDailyAnswer(username)
    resHandler(res, answers)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取某个每日问题所有公开回答
router.get('/daily/:questionId', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let questionId = req.params.questionId
    let answers = await AnswerModel.getPublicDailyAnswerForQuestion(questionId)
    // 添加每个回答是否喜欢过的属性
    let favoriteAnswers = await AnswerModel.getLikeAnswers(username)
    let returnAnswers = answers.map((answer) => {
      let favorite = false
      favoriteAnswers.forEach(function(favoriteAnswer) {
        if (answer.id == favoriteAnswer.id) favorite = true
      }, this)
      return {
        ...answer.toObject(),
        isFavorite: favorite
      }
    })
    resHandler(res, returnAnswers)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取某个广播问题所有公开回答
router.get('/broadcast/:questionId', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let questionId = req.params.questionId
    let answers = await AnswerModel.getBroadcastAnswerForQuestion(questionId)
    // 添加每个回答是否喜欢过的属性
    let favoriteAnswers = await AnswerModel.getLikeAnswers(username)
    let returnAnswers = answers.map((answer) => {
      let favorite = false
      favoriteAnswers.forEach(function(favoriteAnswer) {
        if (answer.id == favoriteAnswer.id) favorite = true
      }, this)
      return {
        ...answer.toObject(),
        isFavorite: favorite
      }
    })
    resHandler(res, returnAnswers)
  } catch (err) {
    errHandler(res, err)
  }
})

// 检查某个广播问题是否回答过
router.get('/broadcast/isAnswer/:questionId', async function (req, res, next) {
  try {
    let isAnswer = await AnswerModel.isAnswer(req.session.username, req.params.questionId)
    resHandler(res, isAnswer)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/:answerId', checkLogin, async function (req, res, next) {
  try {
    let answerId = req.params.answerId
    let answer = await AnswerModel.getAnswer(answerId)
    resHandler(res, answer)
  } catch (err) {
    errHandler(res, err)
  }
})

export default router
