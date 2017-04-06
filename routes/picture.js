import express from 'express'
import TagModel from '../models/tag'
import { resHandler, errHandler } from '../utils/respondUtils'
import moment from 'moment'
import qiniu from 'qiniu'
import PicModel from '../models/picture'

let env = process.env.NODE_ENV || 'default'
  , config = require('../config.' + env)

//七牛key
qiniu.conf.ACCESS_KEY = config.qiniu.QINIUACCESS_KEY
qiniu.conf.SECRET_KEY = config.qiniu.QINIUSECRET_KEY

let router = express.Router()

// 新建图片（管理）
router.post('/', async function(req, res, next) {
  try {
    let pic = req.body.pic
    console.log(pic)
    await PicModel.addPic(pic)
    resHandler(res)
  } catch (err) {
    if (err.code === 11000) {  // index重复了
      errHandler(res, err, 400, 'duplicate tag name', '重复标签了')
    } else {
      errHandler(res, err)
    }
  }
});

// 删除标签（管理）
router.delete('/', async function(req, res, next) {
  try {
    let _id = req.body._id
    console.log(_id)
    await PicModel.deletePicture(_id)
    resHandler(res)
  } catch (err) {
    errHandler(res, err)
  }
});

// 获取全部标签
router.get('/', async function (req, res, next) {
  try {
    let pics = await PicModel.getAllPic()
    resHandler(res, pics)
  } catch (err) {
    errHandler(res, err)
  }
})

router.get('/token', function (req, res, next) {
  try {
    console.log(config.qiniu.QINIUCMSBUCKETNAME)
    var myUptoken = new qiniu.rs.PutPolicy(config.qiniu.QINIUCMSBUCKETNAME)
    var token = myUptoken.token()
    moment.locale('en')
    var currentKey = moment(new Date()).format('YYYY-MM-DD--HH-mm-ss')
    res.header("Cache-Control", "max-age=0, private, must-revalidate")
    res.header("Pragma", "no-cache")
    res.header("Expires", 0)
    resHandler(res, {
      uptoken: token
    })
  } catch(err) {
    errHandler(res, err)
  }
})

export default router
