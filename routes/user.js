let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');

router.get('/', async function(req, res, next) {
	try {
		let result = await UserModel.create('helllo');
		// let user = await UserModel.findOneUser({name:'hello'})
		console.log('CUOWU')
		// console.log(user);
	} catch (err) {
		console.log(err);
	}
});

router.get('/set', async function(req, res, next) {
	let user = await UserModel.setThreeQuestion("helllo",[1,2,23,3])
	console.log(user)
});

router.get('/get', async function(req, res, next) {
	console.log(req.session.user)
})

router.post('/signin', async function() {

});

router.post('/signup', async function() {

});

router.post('/forget', async function() {

});

module.exports = router;