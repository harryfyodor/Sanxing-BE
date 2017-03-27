import moment from 'moment'
import models from '../lib/mongo'
import UserModel from './user'

let { Question, TodayQuestion } = models

export default {
  getTodayQuestion: async (username) => {
    let user = await UserModel.getUser(username, 'tags', 'lastUpdate', 'favoriteQuestions')
    let lastUpdate = moment(user.lastUpdate)
    if (lastUpdate.isBefore(moment().startOf('day'))) {  // 需要重新生成
      console.log('重新生成每日问题！')
      await TodayQuestion.remove({ username })
      let questions = await Question.aggregate().match({
        $and: [{
          type: 'daily'
        }, {
          $or: [{
            tags: {
              $in: user.tags
            }
          }, {
            tags: {
              $size: 0
            }
          }]
        }]}).sample(3)
      // console.log(questions)
      let todayQuestions = questions.map((question, index) => {
        return {
          questionId: question._id,
          username,
          content: question.content,
          tags: question.tags,
          time: index === 0 ? 'morning' : (index === 1 ? 'noon' : 'evening'),
          answered: false
        }
      })
      await TodayQuestion.create(todayQuestions)
      await UserModel.setLastUpdate(username, new Date())
    }
    let todayQuestions = await TodayQuestion.find({username})
    return todayQuestions
  },

  setAnswered: (id, answerId) => TodayQuestion.update({
    _id: id
  }, {
    $set: {
      answered: true,
      answerId
    }
  }),

  changeBroadcastStatus: (id, isPublic) => Question.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      public: isPublic
    }
  }, {
    new: true
  }),

  getUpdatedQuestion: async (username, todayQuestions) => {
    let promises = todayQuestions.map((todayQuestion) => Question.findOne({
      _id: todayQuestion.questionId
    }).select('answers likes'))
    let results = await Promise.all(promises)
    let user = await UserModel.getUser(username, 'favoriteQuestions')
    let favoriteIds = user.favoriteQuestions.map((favoriteQuestion) => favoriteQuestion.toString())
    let updatedQuestions = results.map((result, index) => {
      let todayQuestion = todayQuestions[index]
      let object = todayQuestion.toObject()
      return {
        ...object,
        answers: result.answers,
        likes: result.likes,
        favorited: favoriteIds.includes(todayQuestion.questionId.toString())
      }
    })
    return updatedQuestions
  },

  getBroadcastQuestion: () => Question.find({
    type: 'broadcast',
    public: true
  }),

  getAllBroadcastQuestion: () => Question.find({
    type: 'broadcast'
  }),

  getLikeQuestions: async (username) => {
    let questionIds = (await UserModel.getUser(username, 'favoriteQuestions')).favoriteQuestions
    return Question.find({
      _id: {
        $in: questionIds
      }
    })
  },

  getQuestion: (questionId) => {
    return Question.find({
      _id: questionId
    })
  },

  changeLikeCounter: (questionId, number) => {
    return Question.update({
      _id: questionId
    }, {
      $inc: {
        likes: number
      }
    })
  },

  deleteQuestion: async (questionId) => {
    let question = await Question.findOne({
      _id: questionId
    })
    question.remove()
  },

  addQuestion: (question) => Question.create(question)
}
