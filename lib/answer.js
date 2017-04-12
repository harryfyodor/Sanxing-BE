import mongoose from 'mongoose'
import moment from 'moment'
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
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
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

// 格式化时间格式 （yyyy-MM-dd HH:mm）
AnswerSchema.virtual("date_formatted").get(function() {
  return moment(this.date).utc().zone(-8).format('YYYY-MM-DD HH:mm')
})

export default AnswerSchema
