import { Document, Model, model, Schema, Types } from 'mongoose'
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

tagSchema.static(
  'findOneOrCreate',
  async function (
    condition: Object,
    createArgs: { name: string; creator: string | Types.ObjectId }
  ) {
    const doc = await this.findOne(condition)

    if (doc) {
      return doc
    }

    return await this.create(createArgs)
  }
)

interface TagModel extends Model<ITag> {
  findOneOrCreate(
    condition: Object,
    createArgs: { name: string; creator: string | Types.ObjectId }
  ): Document & ITag
}

const Tag = model<ITag, TagModel>('Tag', tagSchema)

export default Tag
