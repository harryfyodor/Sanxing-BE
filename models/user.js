import models from '../lib/mongo'
import moment from 'moment'

let { User } = models

export default {
  signUp: (username, password) => {
    let lastDay = moment().subtract(1, 'day').toDate()
    User.create({
      username,
      password,
      lastUpdate: lastDay
    })
  },

  getUser: (username, ...selectString) => User.findOne({ username }).select(selectString.join(' ')),

  changeUserPassword: (username, oldPassword, newPassword) => {
    return User.findOneAndUpdate({
      username,
      password: oldPassword
    }, {
      $set: {
        password: newPassword
      }
    }, {
      new: true
    })
  },

  setTags: (username, tags) => {
    return User.findOneAndUpdate({
      username
    }, {
      $set: {
        tags
      }
    }, {
      new: true
    })
  },

  setLastUpdate: (username, lastUpdate) => {
    return User.findOneAndUpdate({
      username
    }, {
      $set: {
        lastUpdate
      }
    }, {
      new: true
    })
  },

  addLikeQuestion: (username, questionId) => {
    return User.findOneAndUpdate({
      username
    }, {
      $addToSet: {
        favoriteQuestions: questionId
      }
    }, {
      new: true
    })
  },

  deleteLikeQuestion: (username, questionId) => {
    return User.findOneAndUpdate({
      username
    }, {
      $pull: {
        favoriteQuestions: questionId
      }
    }, {
      new: true
    })
  },

  addLikeAnswer: (username, answerId) => {
    return User.findOneAndUpdate({
      username
    }, {
      $addToSet: {
        favoriteAnswers: answerId
      }
    }, {
      new: true
    })
  },

  deleteLikeAnswer: (username, answerId) => {
    return User.findOneAndUpdate({
      username
    }, {
      $pull: {
        favoriteAnswers: answerId
      }
    }, {
      new: true
    })
  }
}
