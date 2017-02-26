let User = require('../lib/mongo').User;

module.exports = {
  create: function(options) {
	  return User.create(options);
  },
  // 返回user模型
  findOneUser: function(name) {
	  return User.findOne({
      name: name
    });
  },
  // 设置更新昵称,更新密码，头像，tags，设置今天三个问题
  updateOneUser: function(name, type, item) {
    return User.findOneAndUpdate({
      name: name, 
    }, {
      $set: {
        [type]: item
      }
    });
  },
  // manage
  removeUser: function(name) {
    return User.findOneAndRemove({
      name: name
    });
  },
}