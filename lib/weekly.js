import mongoose from 'mongoose'
let Schema = mongoose.Schema

let WeeklySchema = new Schema({
  username: {
    type: String,
    required: true
  },

  // article recommendation
  article: {
    type: Schema.Types.ObjectId,
    ref: 'article'
  },

  // array of word cards
  words: [{
    type: Schema.Types.ObjectId,
    ref: 'wordCard'
  }],

  // statistics
  stats: {
    wordCount: Number,
    hitWord: String,
    hitWordCount: Number,
    mood: [Number]
  },

  // array of the weekly featured content
  featured: [{
    question: {
      type: Schema.Types.ObjectId,
      ref: 'question'
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: 'answer'
    }
  }],
  generationDate: {
    type: Date,
    default: Date.now
  },
  public: {
    type: Boolean,
    default: false
  }
})

export default WeeklySchema
