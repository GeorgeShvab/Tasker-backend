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
      required: true,
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

tagSchema.virtual('tasks', {
  localField: '_id',
  foreignField: 'tags',
  ref: 'Task',
  count: true,
})

tagSchema.virtual('completedTasks', {
  localField: '_id',
  foreignField: 'tags',
  ref: 'Task',
  count: true,
  match: {
    completed: true,
  },
})

tagSchema.virtual('uncompletedTasks', {
  localField: '_id',
  foreignField: 'tags',
  ref: 'Task',
  count: true,
  match: {
    completed: false,
  },
})

interface TagModel extends Model<ITag> {
  findOneOrCreate(
    condition: Object,
    createArgs: { name: string; creator: string | Types.ObjectId }
  ): Document & ITag
}

tagSchema.set('toObject', { virtuals: true })
tagSchema.set('toJSON', { virtuals: true })

const Tag = model<ITag, TagModel>('Tag', tagSchema)

export default Tag
