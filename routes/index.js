import UserRouter from './user'
import QuestionRouter from './question'
import AnswerRouter from './answer'
import TagRouter from './tag'
import ArticleRouter from './article'
import WordCardRouter from './wordCard'
import WeeklyRouter from './weekly'

export default function (app) {
  app.get('/', function (req, res) {
    res.send('Hello, This is Sanxing BE.')
  })
  app.use('/user', UserRouter)
  app.use('/questions', QuestionRouter)
  app.use('/answers', AnswerRouter)
  app.use('/tags', TagRouter)
  app.use('/articles', ArticleRouter)
  app.use('/wordCards', WordCardRouter)
  app.use('/weeklies', WeeklyRouter)
}
