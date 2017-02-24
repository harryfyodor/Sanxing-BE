let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');

router.get('/', async function(req, res, next) {
	try {
		let result = await UserModel.create({name: 'hello'});
		let user = await UserModel.find({name:'hello'})
		console.log('CUOWU')
		console.log(user);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;