import { model, Schema, Types } from 'mongoose'
import { ITag } from '../types'
import getRandomColor from '../utils/getRandomColor'

const tagSchema = new Schema<ITag>(
  {
    name: {
      required: true,
      type: String,
    },
    creator: {
      ref: 'User',
      required: true,
      type: Types.ObjectId,
    },
    color: {
      default: getRandomColor(),
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Tag = model('Tag', tagSchema)

export default Tag
