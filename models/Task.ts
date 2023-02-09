import { Schema, Types, model } from 'mongoose'
import { ITask } from '../types'

const taskSchema = new Schema<ITask>(
  {
    name: {
      required: true,
      type: String,
    },
    completed: {
      default: false,
      type: Boolean,
    },
    description: {
      default: null,
      type: String,
    },
    list: {
      ref: 'List',
      default: null,
      type: String,
    },
    date: {
      default: null,
      type: Date,
    },
    tags: {
      ref: 'Tag',
      default: [],
      type: [Types.ObjectId],
    },
    creator: {
      ref: 'User',
      required: true,
      type: Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

taskSchema.set('toObject', { virtuals: true })
taskSchema.set('toJSON', { virtuals: true })

const Task = model('Task', taskSchema)

export default Task
