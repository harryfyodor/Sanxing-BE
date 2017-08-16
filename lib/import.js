import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import QuestionSchema from './question'
import TagSchema from './tag'

let env = process.env.NODE_ENV || 'default'
  , mongodbOptions = require('../config.'+env).mongodbOptions;

mongoose.connect(`mongodb://${mongodbOptions.host}:${mongodbOptions.port}/${mongodbOptions.db}`)

let Question = mongoose.model('question', QuestionSchema)
let Tag = mongoose.model('tag', TagSchema)
let questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'questions.json')))

async function importQuestions () {
  try {
    await Question.deleteMany({})
    await Question.insertMany(questions)
    console.log('import finished')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit(0)
  }
}

importQuestions()
