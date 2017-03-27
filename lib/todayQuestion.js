import mongoose from 'mongoose'
let Schema = mongoose.Schema

let TodayQuestionSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  time: {
    type: String,
    enum: ['morning', 'noon', 'evening'],
    required: true
  },
  answered: {
    type: Boolean,
    default: false
  },
  answerId: Schema.Types.ObjectId
})

export default TodayQuestionSchema
