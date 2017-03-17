let errHandler = require('../utils/respondUtils').errHandler;

function checkLogin(req, res, next) {
	// req.session.name = "harry";
	if(req.session.name) {
		next();
	} else {
		return errHandler(res, null, 200, "not login", "请重新登录");
	}
}

module.exports = {
    checkLogin: checkLogin
}