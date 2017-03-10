let Question = require('../lib/mongo').Question;
let UserModel = require('./user');

module.exports = {
  // user
  getThreeQuestion: function() {
    
  },

  likeQuestion: async function(id) {
    let user = await UserModel.findOne({_id: '58c0cf6993fd870e725a668d'});
    console.log(user);
    let a = Question.
    Question
      .where({_id: '58c0cf6993fd870e725a668d'})
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