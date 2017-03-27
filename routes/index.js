import UserRouter from './user'
import QuestionRouter from './question'
import AnswerRouter from './answer'
import TagRouter from './tag'

export default function (app) {
  app.get('/', function (req, res) {
    res.send('Hello, This is Sanxing BE.')
  })
  app.use('/users', UserRouter)
  app.use('/questions', QuestionRouter)
  app.use('/answers', AnswerRouter)
  app.use('/tags', TagRouter)
}
