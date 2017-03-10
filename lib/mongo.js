let config = require('../config');
let mongoose = require('mongoose');
let db = mongoose.connect(`mongodb://localhost/${config.db}`);
let Schema = mongoose.Schema;

// user
let UserSchema = new Schema({
	lastUpdate: Date,
	todayQuestions: {
		type: Array,
		default: []
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	avatar: String,
	password: String,
	name: {
		type: String, // 用户名
		index: {
			unique: true,
		}
	}, 
	hobbies: {
		type: Array, // 存放的是string类型的数据，用户标签
		tags: []
	},
	score: {
		type: Number, // 积分
		default: 0
	},
	// 存放用户喜欢的问题id
	favoriteQuestions: {
		type: Array, 
		default: []
	},
	favoriteAnswers: {
		type: Array, // 存放用户喜欢的回答的id
		default: []
	},
	background: Schema.Types.ObjectId,
});
// UserSchema.index({name:1, unique: true});
let User = mongoose.model('user', UserSchema);

// question
let QuestionSchema = new Schema({
	title: String, // 问题的标题
	detail: String, // 问题的详细内容
	type: String, // “任务型”，“回忆型”等划分
	targetType: {
		type: Number, // 0是个人问题，1是广播问题
	},
	likes: {
		type: Number, // 问题被喜欢的次数
		default: 0
	},
	tags: {
		type: Array, // 标签，和用户的hobbies配合使用
		default: []
	},
	onBroadcast: { // 是否为广播问题
		type: Boolean,
		default: false
	},
	onBroadcastDate: {
		type: Data,
		default: null
	}
});
let Question = mongoose.model('question', QuestionSchema); 

// answer
let AnswerSchema = new Schema({
	questionId: Schema.Types.ObjectId,
	userId: Schema.Types.ObjectId,
	likes: {
		type: Number, // 被喜欢的次数
		default: 0
	},
	targetType: Number, // 0是个人问题的回答，1是广播问题的回答
	type: Number,// 0是文字问题，1是图片问题
	detail: String, // 问题的文本
	createTime: {
		type: Date, // 回答该问题的时间
		default: Date.now
	},
	privacy: Boolean, // 是否允许被查看
	picture: String, // 图片问题
	recommended: {
		type: Boolean,
		default: false
	},
	questionDetail: String, // 问题的文本
});
AnswerSchema.index({ questionId: 1, _id: 1 })
let Answer = mongoose.model('answer', AnswerSchema); 

// Background
let BackgroundSchema = new Schema({
	url: String,
	price: Number
});
let Background = mongoose.model('background', BackgroundSchema); 

// tags
let TagSchema = new Schema({
	name: {
		type: String,
		index: {
			unique: true,
		}
	},
	articles: {
		type: Array,
		default: []
	}
});
let Tag = mongoose.model('tags', TagSchema);
Tag.create({name: '80后'});

module.exports = {
	Tag,
	User,
	Answer,
	Question,
	Background
};