import mongoose from 'mongoose'
import moment from 'moment'
let Schema = mongoose.Schema

let QuestionSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  answers: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['daily', 'broadcast'],
    required: true
  },
  public: Boolean,
  picture: {
    type: String,
    default: null
  }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

QuestionSchema.post('insertMany', async (questions) => {
  let tags = []
  questions.forEach((question) => {
    tags.push(...question.tags)
  })
  tags = [...new Set(tags)].map((tag) => {
    return {
      content: tag
    }
  })
  let TagModel = mongoose.model('tag')
  tags.forEach(async (tag) => {
    let aTag = await TagModel.findOne(tag)
    if (!aTag) {
      await TagModel.create(tag)
    }
  })
})

QuestionSchema.post('save', async (question) => {
  let tags = question.tags.map((tag) => {
    return {
      content: tag
    }
  })
  let TagModel = mongoose.model('tag')
  tags.forEach(async (tag) => {
    let aTag = await TagModel.findOne(tag)
    if (!aTag) {
      await TagModel.create(tag)
    }
  })
})

QuestionSchema.post('remove', async (question) => {
  let tags = question.tags.map((tag) => {
    return {
      content: tag
    }
  })
  let TagModel = mongoose.model('tag')
  tags.forEach(async (tag) => {
    let aTag = await TagModel.findOne(tag)
    if (aTag) {
      await aTag.remove()
    }
  })
})

// 格式化时间格式 （yyyy-MM-dd HH:mm）
QuestionSchema.virtual("date_formatted").get(function() {
  return moment(this.date).format('YYYY-MM-DD HH:mm')
})

export default QuestionSchema
