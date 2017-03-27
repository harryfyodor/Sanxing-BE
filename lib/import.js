import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import QuestionSchema from './question'
import TagSchema from './tag'
import config from '../config'

mongoose.connect(`mongodb://127.0.0.1/${config.db}`)

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
