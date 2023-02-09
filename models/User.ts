import { model, Schema } from 'mongoose'
import { IUser } from '../types'

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    fullName: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      default: 'user',
      type: String,
    },
    avatar: {
      default: null,
      type: String,
    },
    mode: {
      default: 'light',
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

UserSchema.set('toObject', {
  virtuals: true,
  transform(doc, ret) {
    let { password, ...user } = ret
    return user
  },
})

UserSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    let { password, ...user } = ret
    return user
  },
})

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })

const User = model('User', UserSchema)

export default User
