import models from '../lib/mongo'

let { WordCard } = models

export default {
  addWordCard: (data) => WordCard.create(data),

  getWordCardByWord: (word) => WordCard.findOne({ word }),

  getAllWordCards: () => WordCard.find(),

  editWordCardByWord: (word, data) => WordCard.findOneAndUpdate({ word }, data, { new: true }),

  deleteWordCardByWord: (word) => WordCard.findOneAndRemove({ word })
}