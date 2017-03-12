/*
* 这里主要处理问题与回答的地方
*/

let express = require('express');
let router = express.Router();
let QuestionModel = require('../models/question');
let AnswerModal = require('../models/answer');
let checkLogin = require('./middlewares').checkLogin;
let resHandler = require('../utils/respondUtils').resHandler;
let errHandler = require('../utils/respondUtils').errHandler;

router.post("/like/answer", async function(req, res, next) {
  try {
    let question_id = req.body.id;
    await QuestionModel.likeQuestion(question_id);
    return resHandler(res);
  } catch(err) {
    return errHandler(res, err);
  }
});

router.post("/like/answer", async function(req, res, next) {
  try {
    let answer_id = req.body.id;
    await AnswerModal.likeAnswer(answer_id);
    return resHandler(res);
  } catch(err) {
    return errHandler(res, err);
  }
});

// 回答问题接口
router.post("/answer", async function(req, res, next) {
  try {
    let {
      questionId,
      detail,
      type,
      targetType,
      privacy,
      questionDetail,
      picture
    } = req.body;
    let userId = this.session._id;

    // 创建问题的回答
    await AnswerModal.createAnswer({
      questionId,
      detail,
      type,
      targetType,
      privacy,
      questionDetail,
      picture,
      userId
    });

    return resHandler(res);
  } catch(err) {
		return errHandler(res, err);
  }
});

router.get("/broadcast/question", async function(req, res, next) {
  try {
    let question = QuestionModel.getBroadcastQuestion();
    return resHandler(res, question);
  } catch(err) {
    return errHandler(res, err);
  }
});

router.get("/broadcast/answers/:page", async function(req, res, next) {
  try {
    let questionId = req.body.questionId;
    let answers = await AnswerModal.getAnswers(questionId, req.body.page);
    return resHandler(res, answers);
  } catch(err) {
    return errHandler(res, err);
  }
});

module.exports = router;