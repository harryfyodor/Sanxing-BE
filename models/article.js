import models from '../lib/mongo'

let { Article } = models

export default {
  addArticle: (data) => Article.create(data),

  getArticle: (articleId) => Article.findOne({ _id: articleId }),

  getAllArticles: () => Article.find(),

  editArticle: (articleId, data) => Article.findOneAndUpdate({ _id: articleId }, data, { new: true}),

  deleteArticle: (articleId) => Article.findOneAndRemove({ _id: articleId })
}