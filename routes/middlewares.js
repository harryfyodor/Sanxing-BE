function checkLogin(req, res, next) {
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

function returnError(req, res, next) {
	res.send({
      "code":500,
      "enmsg":"server error",
      "cnmsg":"服务器内部错误",
      "data": null
    });
}

module.exports = {
    checkLogin: checkLogin,
	returnError: returnError
}