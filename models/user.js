let User = require('../lib/mongo').User;

module.exports = {
  create: function(user) {
		return User.create(user);
	},
	find: function(user) {
		return User.findOne(user)
	}
}