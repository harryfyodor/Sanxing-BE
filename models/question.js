let Question = require('../lib/mongo').Question;
let UserModel = require('./user');
let TagsModel = require('./tags');
let shuffle = require('../utils/shuffle');

module.exports = {
  // user
  getTodayQuestion: async function(name) {
    let user = await UserModel.findOne({ name: name }),
        tags = user.hobbies,
        lastUpdate = user.lastUpdate,
        todayQuestions = user.todayQuestions,
        today = new Date();

    // 如果不是为当天或者为空，就新建
    // 新建的逻辑是：先找tags，然后把分别从三个tags里面找题目
    if(today.getDate() !== lastUpdate.getDate() ||
       today.getMonth() !== lastUpdate.getMonth() ||
       today.getFullYear() !== lastUpdate.getFullYear () ||
       todayQuestions.length === 0) {
        let intersectionArray = [];
        // 获取所有符合要求的问题
        let questions = await Question.$where(function() {
          // 交集
          intersectionArray = Array.from(new Set([...tags].filter(x => this.tags.has(x))));
          // 若标签为空（即最一般的题目的情况）或者有交集的时候
          return this.tags.length === 0 || intersectionArray.length !== 0;
        }).limit(3);
    }
    // 是的话就


    // 插入数据库

    // 根据当前小时数来返回多大的
  },

  // 下拉的请求，直接返回所有问题
  getAllToday: async function() {
    let user = await UserModel.findOne({ name: name }),
        todayQuestions = user.todayQuestions;

    return todayQuestions;
  },

  fineOne: function(opts) {
    return Question.findOne(opts);
  },

  // 根据问题id给问题点赞
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
      .where({targetType: 1})
      .findOne({ onBroadcast: true }) // 是否为广播问题
      .select("title detail likes");
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