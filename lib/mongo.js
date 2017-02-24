let config = require('../config');
let mongoose = require('mongoose');
let db = mongoose.connect(`mongodb://localhost/${config.db}`);

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Successfully Open!');
// })

// user
let UserSchema = mongoose.Schema({
	name: String
});
UserSchema.index({name:1, unique: true});
let User = mongoose.model('user', UserSchema);

// answer
let AnswerSchema = mongoose.Schema({

});
let Answer = mongoose.model('answer', AnswerSchema); 

// question
let QuestionSchema = mongoose.Schema({

});
let Question = mongoose.model('question', QuestionSchema); 

// Background
let BackgroundSchema = mongoose.Schema({

});
let Background = mongoose.model('background', BackgroundSchema); 

module.exports = {
	User,
};