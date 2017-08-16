// work in progress, no permission checking yet
import express from 'express'
import WordCardModel from '../models/wordCard'
import { resHandler, errHandler } from '../utils/respondUtils'
import { checkLogin } from './middlewares'

let router = express.Router()

// 新建词卡（管理）
router.post('/', async function (req, res, next) {
  try {
    let wordCard = await WordCardModel.addWordCard(req.body)
    resHandler(res, wordCard, 201)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取所有词卡（管理）
router.get('/all', async function (req, res, next) {
  try {
    let WordCards = await WordCardModel.getAllWordCards()
    resHandler(res, WordCards)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取词卡
router.get('/:word', async function (req, res, next) {
  try {
    let word = req.params.word
    let wordCard = await WordCardModel.getWordCardByWord(word)
    resHandler(res, wordCard)
  } catch (err) {
    errHandler(res, err)
  }
})

// 修改词卡（管理）
router.put('/:word', async function (req, res, next) {
  try {
    let word = req.params.word
    let editedWordCard = req.body
    let wordCard = await WordCardModel.editWordCardByWord(word, editedWordCard)
    resHandler(res, wordCard)
  } catch (err) {
    errHandler(res, err)
  }
})

// 删除词卡（管理）
router.delete('/:word', async function (req, res, next) {
  try {
    let word = req.params.word
    await WordCardModel.deleteWordCardByWord(word)
    resHandler(res, null, 204)
  } catch (err) {
    errHandler(res, err)
  }
})

export default router