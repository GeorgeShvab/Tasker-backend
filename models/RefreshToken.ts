import { model, Schema } from 'mongoose'
import { IRefreshToken } from '../types'

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      required: true,
      type: String,
    },
    user: {
      ref: 'User',
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const RefreshToken = model('Refresh_token', refreshTokenSchema)

export default RefreshToken
