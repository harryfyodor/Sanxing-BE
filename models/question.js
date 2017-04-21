import moment from 'moment'
import models from '../lib/mongo'
import UserModel from './user'

let { Question, TodayQuestion } = models

export default {
  getTodayQuestion: async (username) => {
    let user = await UserModel.getUser(username, 'tags', 'lastUpdate', 'favoriteQuestions')
    let lastUpdate = moment(user.lastUpdate)
    if (lastUpdate.isBefore(moment().utcOffset(8).startOf('day'))) {  // 需要重新生成
      console.log('重新生成每日问题！')
      await TodayQuestion.remove({ username })
      let questions
      if (user.tags.length != 0) {
        questions = await Question.aggregate().match({
        $and: [{
          type: 'daily'
        }, {
          tags: {
            $in: user.tags
        }
        }]}).sample(3)
      } else {
        // user has no tags, sample from "购物"
        questions = await Question.aggregate().match({
        $and: [{
          type: 'daily'
        }, {
          tags: {
            $in: ["购物"]
        }
        }]}).sample(3)
      }
      if (questions.length < 3) {
        // user has not enough tags, sample from both user tags and "购物"
        questions = await Question.aggregate().match({
        $and: [{
          type: 'daily'
        }, {
          $or: [{
            tags: {
              $in: user.tags
            }
          }, {
            tags: {
              $in: ["购物"]
            }
          }]
        }]}).sample(3)
      }
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

  reGenerateTodayQuestions: async (username) => {
    let user = await UserModel.getUser(username, 'tags')
    // 直接重新生成
    console.log('手动重新生成每日问题！')
    await TodayQuestion.remove({ username })
    let questions
    if (user.tags.length != 0) {
      questions = await Question.aggregate().match({
      $and: [{
        type: 'daily'
      }, {
        tags: {
          $in: user.tags
      }
      }]}).sample(3)
    } else {
      // user has no tags, sample from "tag2"
      questions = await Question.aggregate().match({
      $and: [{
        type: 'daily'
      }, {
        tags: {
          $in: ["购物"]
      }
      }]}).sample(3)
    }
    if (questions.length < 3) {
        // user has not enough tags, sample from both user tags and "购物"
        questions = await Question.aggregate().match({
        $and: [{
          type: 'daily'
        }, {
          $or: [{
            tags: {
              $in: user.tags
            }
          }, {
            tags: {
              $in: ["购物"]
            }
          }]
        }]}).sample(3)
    }
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
    
    todayQuestions = await TodayQuestion.find({username})
    return todayQuestions
  },

  getTodayQuestionByQuestionId: async (username, questionId) => {
    let todayQuestion = await TodayQuestion.findOne({username, questionId})
    return todayQuestion
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
      public: isPublic,
      date: new Date()
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
      // swap questionId and _id for compatibility
      let questionId = object.questionId
      object.questionId = object._id
      object._id = questionId
      return {
        ...object,
        answers: result.answers,
        likes: result.likes,
        favorited: favoriteIds.includes(todayQuestion.questionId.toString())
      }
    })
    return updatedQuestions
  },

  // 获取公开的广播问题中日期值最晚的
  getBroadcastQuestion: () => Question.find({
    type: 'broadcast',
    public: true
  }).sort({ 
    date : -1 
  }).limit(1),

  // 获取所有已经公开的广播问题（管理）
  getAllPublicBroadcastQuestion: () => Question.find({
    type: 'broadcast',
    public: true
  }).sort({
    date: -1
  }),

  // 获取所有未公开的广播问题（管理）
  getAllNotPublicBroadcastQuestion: () => Question.find({
    type: 'broadcast',
    public: false
  }).sort({
    date: 1
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

  addQuestion: (question) => Question.create(question),

  // 获取所有每日问题（管理）
  getAllDaliyQuestion: () => Question.find({
    type: 'daily'
  }).sort({ 
    date : -1 
  }),

  // 更新每日问题（管理）
  updateQuestion: (questionId, data) => {
    return Question.findOneAndUpdate({
      _id: questionId
    }, {
      $set: data
    }, {
      new: true
    })
  }
}
