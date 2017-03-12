/*
* 这里主要处理有关用户的地方
*/

let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let TagModel = require('../models/tags');
let crypto = require('crypto');
let checkLogin = require('./middlewares').checkLogin;
let resHandler = require('../utils/respondUtils').resHandler;
let errHandler = require('../utils/respondUtils').errHandler;

function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

// 获取所有tags
router.get('/get/tags', async function(req, res, next) {
	try {
		// let url = await TagModel.getUrlsByTag(["90后"]);
		let tags = await TagModel.getAllTags();
		return resHandler(res, tags);
	} catch(err) {
		return errHandler(res, err);
	}
});

// 设置标签
router.post('/set/profile', checkLogin, async function(req, res, next) {
	try {
		let name = req.session.name;
		name = 'Manny';
		console.log(req.body.hobbies);
		await UserModel.updateOneUser(name, {
			hobbies: req.body.hobbies
		});
		// 成功设置标签
		return resHandler(res);
	} catch(err) {
		return errHandler(res, err);
	}
});

// 登录功能
router.post('/signin', async function(req, res, next) {
	try {
		let name = req.body.name,
			password = md5(req.body.password);

		let user = await UserModel.findOneUser(name);

		// 未注册过
		if(!user) {
			return errHandler(res, null, 200, "not sign up", "您还没有注册过");
		}
		// 成功
		if(user.password === password) {
			req.session.name = name;
			req.session._id = user._id;
			return resHandler(res);
		}
		// 密码错误
		return errHandler(res, null, 200, "wrong password", "密码错误");
	} catch (err) {
		return errHandler(res, err);
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
		return resHandler(res);
	} catch (err) {
		if(err.code === 11000) {
			return errHandler(res, err, 200, "duplicate name", "用户名已被注册");
		} else {
			return errHandler(res, err);
		}
	}
});

module.exports = router;