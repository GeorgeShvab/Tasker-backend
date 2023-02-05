import { model, Schema } from 'mongoose'
import { IRefreshToken } from '../types'

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const refreshTokenModel = model('Refresh_token', refreshTokenSchema)

export default refreshTokenModel
