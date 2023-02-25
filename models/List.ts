import { model, Schema, Types } from 'mongoose'
import { IList } from '../types'
import getRandomColor from '../utils/getRandomColor'

const listSchema = new Schema<IList>(
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

listSchema.virtual('tasks', {
  localField: '_id',
  foreignField: 'list',
  ref: 'Task',
  count: true,
})

listSchema.virtual('completedTasks', {
  localField: '_id',
  foreignField: 'list',
  ref: 'Task',
  count: true,
  match: {
    completed: true,
  },
})

listSchema.virtual('uncompletedTasks', {
  localField: '_id',
  foreignField: 'list',
  ref: 'Task',
  count: true,
  match: {
    completed: false,
  },
})

listSchema.set('toObject', { virtuals: true })
listSchema.set('toJSON', { virtuals: true })

const List = model('List', listSchema)

export default List
