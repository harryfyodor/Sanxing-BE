import models from '../lib/mongo'
import UserModel from './user'

let { Answer } = models

export default {
  addAnswer: (data) => Answer.create(data),

  getDailyAnswer: (username) => Answer.find({
    answerer: {
      username
    },
    type: 'daily'
  }),

  getAnswerHistory: (username) => Answer.find({
    answerer: {
      username
    }
  }).sort({ 
    date : -1 
  }),

  getDailyAnswerForQuestion: (username, questionId) => Answer.find({
    answerer: {
      username
    },
    type: 'daily',
    questionId
  }),

  getBroadcastAnswerForQuestion: (questionId) => Answer.find({
    type: 'broadcast',
    questionId
  }),

  getAnswer: (answerId) => Answer.findOne({
    _id: answerId
  }),

  getLikeAnswers: async (username) => {
    let answerIds = (await UserModel.getUser(username, 'favoriteAnswers')).favoriteAnswers
    return Answer.find({
      _id: {
        $in: answerIds
      }
    })
  },

  changeLikeCounter: (answerId, number) => {
    return Answer.update({
      _id: answerId
    }, {
      $inc: {
        likes: number
      }
    })
  }
}
