import mongoose from 'mongoose'
import UserSchema from './user'
import QuestionSchema from './question'
import AnswerSchema from './answer'
import TodayQuestionSchema from './todayQuestion'
import TagSchema from './tag'

let env = process.env.NODE_ENV || 'default'
  , mongodbOptions = require('../config.'+env).mongodbOptions;

let User = mongoose.model('user', UserSchema)
let Question = mongoose.model('question', QuestionSchema)
let Answer = mongoose.model('answer', AnswerSchema)
let TodayQuestion = mongoose.model('todayQuestion', TodayQuestionSchema)
let Tag = mongoose.model('tag', TagSchema)

mongoose.connect(`mongodb://${mongodbOptions.host}:${mongodbOptions.port}/${mongodbOptions.db}`)

export default {
  User,
  Answer,
  Question,
  TodayQuestion,
  Tag
}
