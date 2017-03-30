import models from '../lib/mongo'

let { Weekly } = models

export default {
  // read only for backend API (generated else where)
  getLatestWeekly: (username) => Weekly.find({
    username
  }).sort({ 
      date : -1 
  }).limit(1)
  .populate('article')
  .populate('words')
  .populate('featured.question')
  .populate('featured.answer'),

  setWeeklyPublic: (weeklyId, username, isPublic) => Weekly.update({
    _id: weeklyId,
    username
  }, {
    $set: {
      public: isPublic
    }
  }),

  // only for testing
  addWeekly: (data) => Weekly.create(data)
}