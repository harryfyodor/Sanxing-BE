import models from '../lib/mongo'

let { Tag } = models

export default {
  getAllTags: () => Tag.find({}),

  addTag: (tag) => Tag.create({content: tag}),

  deleteTag: async (content) => {
    let tag = await Tag.findOne({
      content: content
    })
    tag.remove()
  }
}

