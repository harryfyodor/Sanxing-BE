function checkLogin(req, res, next) {
	// req.session.name = "harry";
	if(req.session.name) {
		next();
	} else {
		return res.send({
			"code":200,
			"enmsg":"not login",
			"cnmsg":"请重新登录",
			"data":null
		});
	}
}

module.exports = {
    checkLogin: checkLogin
}