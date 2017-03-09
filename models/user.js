let User = require('../lib/mongo').User;

module.exports = {
  // 创建user
  create: function(options) {
	  return User.create(options);
  },
  // 通过名字返回user
  findOneUser: function(name) {
	  return User.findOne({
      name: name
    });
  },

  findOne: function(opts) {
    return User.findOne(opts);
  },

  updateTodayQuestion: async function(id) {
  },
  // mine
  // 设置更新昵称,更新密码，头像，tags，设置今天三个问题
  updateOneUser: function(name, options) {
    User.findOneAndUpdate({
      name: name, 
    }, {
      $set: options
    });
  },
  // manage
  removeUser: function(name) {
    return User.findOneAndRemove({
      name: name
    });
  },
}