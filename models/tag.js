import models from '../lib/mongo'

let { Tag } = models

export default {
  getAllTags: () => Tag.find({})
}

