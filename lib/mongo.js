import mongoose from 'mongoose'
import UserSchema from './user'
import QuestionSchema from './question'
import AnswerSchema from './answer'
import TodayQuestionSchema from './todayQuestion'
import TagSchema from './tag'
import ArticleSchema from './article'
import WordCardSchema from './wordCard'
import WeeklySchema from './weekly'

let env = process.env.NODE_ENV || 'default'
  , mongodbOptions = require('../config.'+env).mongodbOptions;

let User = mongoose.model('user', UserSchema)
let Question = mongoose.model('question', QuestionSchema)
let Answer = mongoose.model('answer', AnswerSchema)
let TodayQuestion = mongoose.model('todayQuestion', TodayQuestionSchema)
let Tag = mongoose.model('tag', TagSchema)
let Article = mongoose.model('article', ArticleSchema)
let WordCard = mongoose.model('wordCard', WordCardSchema)
let Weekly = mongoose.model('weekly', WeeklySchema)

mongoose.connect(`mongodb://${mongodbOptions.host}:${mongodbOptions.port}/${mongodbOptions.db}`)

export default {
  User,
  Answer,
  Question,
  TodayQuestion,
  Tag,
  Article,
  WordCard,
  Weekly
}
