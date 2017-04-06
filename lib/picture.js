import mongoose from 'mongoose'
let Schema = mongoose.Schema

let PictureSchema = new Schema({
  url: {
    type: String,
    required: true,
    index: true,
    unique: true
  }
})

export default PictureSchema