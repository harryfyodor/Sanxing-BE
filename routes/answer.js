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
    let todayQuestion = await QuestionModel.getTodayQuestionByQuestionId(req.body.questionId)
    if (todayQuestion) {
      await QuestionModel.setAnswered(todayQuestion._id, answer._id)
    }
    resHandler(res, answer, 201)
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

// 获取某个每日问题所有回答
router.get('/daily/:questionId', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let questionId = req.params.questionId
    let answers = await AnswerModel.getDailyAnswerForQuestion(username, questionId)
    resHandler(res, answers)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/broadcast/:questionId', checkLogin, async function (req, res, next) {
  try {
    let questionId = req.params.questionId
    let answers = await AnswerModel.getBroadcastAnswerForQuestion(questionId)
    resHandler(res, answers)
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
