import mongoose from 'mongoose'
let Schema = mongoose.Schema

export default new Schema({
  content: {
    type: String,
    required: true,
    index: true,
    unique: true
  }
})
