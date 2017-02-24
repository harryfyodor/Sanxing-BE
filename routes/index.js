module.exports = function(app) {
  app.get('/', function(req, res) {
		res.send('Hello, This is Sanxing BE.')
	});
	app.use('/user', require('./user'));
	app.use('/mine', require('./mine'));
	app.use('/question', require('./question'));
	app.use('/manage', require('./manage'));

	
}