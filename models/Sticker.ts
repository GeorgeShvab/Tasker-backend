import { model, Schema, Types } from 'mongoose'
import { ISticker } from '../types'
import getRandomColor from '../utils/getRandomColor'

const stickerSchema = new Schema<ISticker>(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      default: null,
      type: String,
    },
    creator: {
      ref: 'User',
      required: true,
      type: Types.ObjectId,
    },
    color: {
      default: getRandomColor,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Sticker = model('Sticker', stickerSchema)

export default Sticker
