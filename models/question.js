let Question = require('../lib/mongo').Question;
let UserModel = require('./user');

module.exports = {
  // user
  getThreeQuestion: function() {
    
  },

  // 根据问题id给问题点赞
  likeQuestion: async function(id) {
    await Question
      .where({_id: id})
      .update({
        $inc: {
          likes: 1
        }
      });
  },

  getBroadcastQuestion: function() {
    return Question
      .findOne({ onBroadcast: true }) // 是否为广播问题
  },

  getQuestionById(id) {
    return Question.findOne({
      _id: id
    });
  },
  // manage
  createQuestion: function(opts) {
	  Question.create(opts);
  },
  editQuestion: function(id, opts) {
    Question
      .where({_id: id})
      .update({
        $set: opts
      });
  },
  setBroadcastingQuestion: function(id, bool) {
    Question
      .where({_id: id})
      .update({
        $set: {
          bool: bool
        }
      });
  },
}