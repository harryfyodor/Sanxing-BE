import mongoose from 'mongoose'
import UserSchema from './user'
import QuestionSchema from './question'
import AnswerSchema from './answer'
import TodayQuestionSchema from './todayQuestion'
import TagSchema from './tag'
import config from '../config'

let User = mongoose.model('user', UserSchema)
let Question = mongoose.model('question', QuestionSchema)
let Answer = mongoose.model('answer', AnswerSchema)
let TodayQuestion = mongoose.model('todayQuestion', TodayQuestionSchema)
let Tag = mongoose.model('tag', TagSchema)

mongoose.connect(`mongodb://127.0.0.1/${config.db}`)

export default {
  User,
  Answer,
  Question,
  TodayQuestion,
  Tag
}
