import mongoose from 'mongoose'
let Schema = mongoose.Schema

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  cover: String,
  body: String,
  tags: {
    type: [String],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default ArticleSchema