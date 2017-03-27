import mongoose from 'mongoose'
let Schema = mongoose.Schema

let AnswerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  answerer: {
    username: {
      type: String,
      required: true
    },
    avatar: String
  },
  content: {
    type: String,
    required: true
  },
  questionContent: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    enum: ['morning', 'noon', 'evening']
  },
  type: {
    type: String,
    enum: ['daily', 'broadcast']
  },
  likes: {
    type: Number,
    default: 0
  },
  mood: {
    type: Number,
    min: 0,
    max: 100
  }
})

// 要给对应问题的回答数+1
AnswerSchema.post('save', async (answer) => {
  let QuestionModel = mongoose.model('question')
  await QuestionModel.update({
    _id: answer.questionId
  }, {
    $inc: {
      answers: 1
    }
  })
})

export default AnswerSchema
