import express from 'express'
import TagModel from '../models/tag'
import { resHandler, errHandler } from '../utils/respondUtils'

let router = express.Router()

// 提交回答
router.get('/', async function (req, res, next) {
  try {
    let tags = await TagModel.getAllTags()
    tags = tags.map((tag) => tag.content)
    resHandler(res, tags)
  } catch (err) {
    errHandler(res, err)
  }
})

export default router
