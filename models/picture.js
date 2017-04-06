import models from '../lib/mongo'

let { Picture } = models

export default {
  getAllPic: () => Picture.find({}),

  addPic: (url) => Picture.create({url: url}),

  deletePicture: async (_id) => {
    let pic = await Picture.findOne({
      _id: _id
    })
    pic.remove()
  }
}

