let User = require('../lib/mongo').User;

module.exports = {
  // user
  create: function(options) {
	  return User.create(options);
  },
  // 返回user模型
  findOneUser: function(name) {
	  return User.findOne({
      name: name
    });
  },
  updateTodayQuestion: async function(id) {
    // let today = new Date(),
    //     user = await User.findOne({_id: id}),
    //     lastDate = user.lastUpdate;

  },
  // mine
  // 设置更新昵称,更新密码，头像，tags，设置今天三个问题
  updateOneUser: function(name, type, item) {
    User.findOneAndUpdate({
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