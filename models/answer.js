let Answer = require('../lib/mongo').Answer;

module.exports = {
  // 回答
  createAnswer: function(opts) {
    return Answer.create(opts)
  },
  likeAnswer: function(answerId) {
    return Answer.where({ _id: answerId }).update({
      $inc: {
        likes: 1
      }
    })
  },
  // 广播问题回答
  getAnswers: function(questionId) {
    return Answer.find({
      targetType: 1,
      questionId: questionId
    })
  },
  // 设置精品回答
  setRecommend: function(answerId, bool) {
    return Answer.where({ _id: answerId }).update({
      $set: {
        recommended: bool
      }
    })
  },
  // 精品回答
  getAnswer: function(questionId) {
    // return Answer.where({
    //   questionId: questionId,
    //   privacy: false,
    //   recommended: true,

    // })
  },
  // 获取历史, 每次获取前十条，分页
  getAnswersByUserId: function(userId) {

  }
}