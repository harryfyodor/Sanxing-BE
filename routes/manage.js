let express = require('express');
let router = express.Router();
let Question = require('../models/question');
let Tag = require('../models/tags');

router.post('/', function(req, res, next) {
  res.send('hello manage');
  Question.createQuestion({title: '你今天开心吗？'});
});

router.get('/get/questions', async function() {

});

router.get('/get/question', async function() {

});

router.post('/add/question', async function(req, res, next) {
  try {

  } catch(err) {

  }
});

router.post('/edit/question', async function(req, res, next) {

});

router.post('/add/tag', async function(req, res, next) {
  try {

  } catch(err) {

  }
});

router.delete('/delete/tag', async function(req, res, next) {

});

module.exports = router;