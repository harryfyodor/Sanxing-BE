import express from 'express'
import TagModel from '../models/tag'
import { resHandler, errHandler } from '../utils/respondUtils'

let router = express.Router()

// 新建标签（管理）
router.post('/', async function(req, res, next) {
  try {
    let tag = req.body.tag
    await TagModel.addTag(tag)
    resHandler(res)
  } catch (err) {
    if (err.code === 11000) {  // index重复了
      errHandler(res, err, 400, 'duplicate tag name', '重复标签了')
    } else {
      errHandler(res, err)
    }
  }
});

// 删除标签（管理）
router.delete('/', async function(req, res, next) {
  try {
    let tag = req.body.tag
    await TagModel.deleteTag(tag)
    resHandler(res)
  } catch (err) {
    errHandler(res, err)
  }
});

// 获取全部标签
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
