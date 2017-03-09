/*
* 这里主要处理问题与回答的地方
*/

let express = require('express');
let router = express.Router();
let QuestionModel = require('../models/question');
let AnswerModal = require('../models/answer');

router.post("/like/answer", async function(req, res, next) {
  try {
    let question_id = req.body.id;
    // 58c10639794fed20283b2af3
    await QuestionModel.likeQuestion(question_id);
    res.send({
			"code":200,
			"enmsg":"ok",
			"cnmsg":"成功",
			"data": null
		});
  } catch(err) {
    console.log(err)
    res.send({
			"code":500,
			"enmsg":"server error",
			"cnmsg":"服务器内部错误",
			"data": null
		});
  }
});

router.post("/like/answer", async function(req, res, next) {
  try {
    let answer_id = req.body.id;
    // 58c10639794fed20283b2af3
    await AnswerModal.likeAnswer(answer_id);
    res.send({
			"code":200,
			"enmsg":"ok",
			"cnmsg":"成功",
			"data": null
		});
  } catch(err) {
    console.log(err)
    res.send({
			"code":500,
			"enmsg":"server error",
			"cnmsg":"服务器内部错误",
			"data": null
		});
  }
});

// 回答问题接口
router.post("/answer", async function(req, res, next) {
  try {

  } catch(err) {
    
  }
});

router.post("/broadcast/question", async function(req, res, next) {

});

router.get("", async function(req, res, next) {

});

module.exports = router;