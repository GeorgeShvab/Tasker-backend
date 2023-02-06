import { Schema, Types, model } from 'mongoose'
import { ITask } from '../types'

const taskSchema = new Schema<ITask>(
  {
    name: {
      required: true,
      type: String,
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
      type: [],
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

const Task = model('Task', taskSchema)

export default Task