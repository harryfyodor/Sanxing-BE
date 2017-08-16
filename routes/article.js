// work in progress, no permission checking yet
import express from 'express'
import ArticleModel from '../models/article'
import { resHandler, errHandler } from '../utils/respondUtils'
import { checkLogin } from './middlewares'

let router = express.Router()

// 新建文章(管理)
router.post('/', async function (req, res, next) {
  try {
    let article = await ArticleModel.addArticle(req.body)
    resHandler(res, article, 201)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取所有文章(管理)
router.get('/all', async function (req, res, next) {
  try {
    let articles = await ArticleModel.getAllArticles()
    resHandler(res, articles)
  } catch (err) {
    errHandler(res, err)
  }
})

// 获取文章(管理)
router.get('/:articleId', async function (req, res, next) {
  try {
    let articleId = req.params.articleId
    let article = await ArticleModel.getArticle(articleId)
    resHandler(res, article)
  } catch (err) {
    errHandler(res, err)
  }
})

// 修改文章(管理)
router.put('/:articleId', async function (req, res, next) {
  try {
    let articleId = req.params.articleId
    let editedArticle = req.body
    let article = await ArticleModel.editArticle(articleId, editedArticle)
    resHandler(res, article)
  } catch (err) {
    errHandler(res, err)
  }
})

// 删除文章(管理)
router.delete('/:articleId', async function (req, res, next) {
  try {
    let articleId = req.params.articleId
    await ArticleModel.deleteArticle(articleId)
    resHandler(res, null, 204)
  } catch (err) {
    errHandler(res, err)
  }
})

export default router