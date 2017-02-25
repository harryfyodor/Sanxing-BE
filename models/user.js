let User = require('../lib/mongo').User;

module.exports = {
  create: function(name) {
	  return User.create({
      name: name
    });
  },
  // 返回user模型
  findOneUser: function(name) {
	  return User.findOne({
      name: name
    });
  },
  setThreeQuestion: function(username, questionIds) {
    return User.findOneAndUpdate({
      name: username
    }, {
      $set:{
        todayQuestions: questionIds
      }
    });
  },
  // 设置更新昵称或者更新密码
  updateOneUser: function(name) {
    
  },
  addTags: function(tags) {
    
  },
  updateTags: function(tags) {

  },
  // manage
  deleteUser: function() {

  },
  editUser: function() {

  }
}