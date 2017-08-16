import express from 'express'
import WeeklyModel from '../models/weekly'
import { resHandler, errHandler } from '../utils/respondUtils'
import { checkLogin } from './middlewares'

let router = express.Router()

// 获取最新周报(用户)
router.get('/', checkLogin, async function (req, res, next) {
  try {
    let username = req.session.username
    let weekly = await WeeklyModel.getLatestWeekly(username)
    resHandler(res, weekly)
  } catch (err) {
    errHandler(res, err)
  }
})

// 分享/取消分享周报(用户)
router.put('/share/:weeklyId', checkLogin, async function (req, res, next) {
  try {
    let weeklyId = req.params.weeklyId
    let username = req.session.username
    let isPublic = req.body.public
    await WeeklyModel.setWeeklyPublic(weeklyId, username, isPublic)
    resHandler(res, null)
  } catch (err) {
    errHandler(res, err)
  }
})

// (仅测试用)创建周报
router.post('/', async function (req, res, next) {
  try {
    let weekly = await WeeklyModel.addWeekly(req.body)
    resHandler(res, weekly, 201)
  } catch (err) {
    errHandler(res, err)
  }
})

export default router