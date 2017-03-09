/*
* 这里主要处理有关用户的地方
*/

let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let TagModel = require('../models/tags');
let checkLogin = require('./middlewares');
let crypto = require('crypto');

function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

// 获取所有tags
router.post('/get/tags', async function(req, res, next) {
	try {
		// let url = await TagModel.getUrlsByTag(["90后"]);
		let tags = await TagModel.getAllTags();
		res.send({
			"code":200,
			"enmsg":"ok",
			"cnmsg":"成功",
			"data": tags
		});
	} catch(err) {
		res.send({
			"code":500,
			"enmsg":"server error",
			"cnmsg":"服务器内部错误",
			"data":null
		});
	}
});

// 设置标签
router.post('/set/profile', async function(req, res, next) {
	try {
		let name = req.session.name;

		await UserModel.updateOneUser(name, {
			hobbies: req.body.hobbies
		});

		// 成功设置标签
		res.send({
			"code":200,
			"enmsg":"ok",
			"cnmsg":"成功",
			"data":null
		});
	} catch(err) {
		res.send({
			"code":500,
			"enmsg":"server error",
			"cnmsg":"服务器内部错误",
			"data":null
		});
	}
});

// 登录功能
router.post('/signin', async function(req, res, next) {
	try {
		let name = req.body.name,
			password = md5(req.body.password);

		let user = await UserModel.findOneUser(name);

		// 未注册
		if(!user) {
			return res.send({
				"code":200,
				"enmsg":"not sign up",
				"cnmsg":"您还没有注册过",
				"data":null
			});
		}
		// 成功
		if(user.password === password) {
			req.session.name = name;
			req.session._id = user._id;
			return res.send({
				"code":200,
				"enmsg":"ok",
				"cnmsg":"成功",
				"data":null
			});
		}
		// 密码错误
		res.send({
			"code":200,
			"enmsg":"wrong password",
			"cnmsg":"密码错误",
			"data":null
		});
	} catch (err) {
		console.log(err);
		res.send({
			"code":500,
			"enmsg":"server error",
			"cnmsg":"服务器内部错误",
			"data":null
		});
	}
});

// 注册功能
router.post('/signup', async function(req, res, next) {
	try {
		let name = req.body.name,
			password = md5(req.body.password);

		await UserModel.create({
			name: name,
			password: password
		});

		// 成功注册！
		res.send({
			"code":200,
			"enmsg":"ok",
			"cnmsg":"成功",
			"data":null
		});
	} catch (err) {
		if(err.code === 11000) {
			res.send({
				"code":200,
				"enmsg":"duplicate name",
				"cnmsg":"用户名已被注册",
				"data":null
			});
		} else {
			res.send({
				"code":500,
				"enmsg":"server error",
				"cnmsg":"服务器内部错误",
				"data":null
			});
		}
	}
});

module.exports = router;