import mongoose from 'mongoose'
let Schema = mongoose.Schema

let WordCardSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  englishWord: String,
  content: String,
  cover: String,
  tags: {
    type: [String],
    default: []
  }
})

export default WordCardSchema