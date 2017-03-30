import express from 'express'
import QuestionModel from '../models/question'
import { resHandler, errHandler } from '../utils/respondUtils'
import { checkLogin } from './middlewares'

let router = express.Router()

router.get('/today', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let todayQuestions = await QuestionModel.getTodayQuestion(username)
    let updatedQuestions = await QuestionModel.getUpdatedQuestion(username, todayQuestions)
    resHandler(res, updatedQuestions)
  } catch (err) {
    errHandler(res, err)
  }
})

router.put('/broadcast', async function (req, res, next) {
  try {
    let questionId = req.body.questionId
    let isPublic = req.body.public
    let question = await QuestionModel.changeBroadcastStatus(questionId, isPublic)
    resHandler(res, question)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/broadcast', async function (req, res, next) {
  try {
    let questions = await QuestionModel.getBroadcastQuestion()
    resHandler(res, questions)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/broadcast/all', async function (req, res, next) {
  try {
    let questions = await QuestionModel.getAllPublicBroadcastQuestion()
    resHandler(res, questions)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/:questionId', async function (req, res, next) {
  try {
    let questionId = req.params.questionId
    let question = await QuestionModel.getQuestion(questionId)
    resHandler(res, question)
  } catch (err) {
    errHandler(res, err)
  }
})

router.post('/', async function (req, res, next) {
  try {
    let question = await QuestionModel.addQuestion(req.body)
    resHandler(res, question, 201)
  } catch (err) {
    errHandler(res, err)
  }
})

router.delete('/', async function (req, res, next) {
  try {
    let questionId = req.body.questionId
    await QuestionModel.deleteQuestion(questionId)
    resHandler(res, null, 204)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取全部每日问题（管理）
router.get('/daliy/all', async function (req, res, next) {
  try {
    let questions = await QuestionModel.getAllDaliyQuestion()
    resHandler(res, questions)
  } catch (err) {
    errHandler(res, err)
  }
})

export default router
