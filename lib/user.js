import mongoose from 'mongoose'
let Schema = mongoose.Schema

export default new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  favoriteQuestions: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  favoriteAnswers: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  avatar: String,
  lastUpdate: Date
})
