import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import RefreshToken from '../models/RefreshToken'

dotenv.config({ path: '.env.local' })

const accessTokenSecret: string | undefined =
  process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret: string | undefined =
  process.env.JWT_REFRESH_TOKEN_SECRET

if (!refreshTokenSecret || !accessTokenSecret) {
  throw new Error('Немає ключів для jwt токенів')
}

export const genAccessJwt = (id: string | Types.ObjectId): string => {
  id = String(id)
  const token = jwt.sign(
    {
      _id: id,
    },
    accessTokenSecret,
    {
      expiresIn: '5m',
    }
  )
  return token
}

export const genRefreshJwt = async (
  id: string | Types.ObjectId
): Promise<string> => {
  id = String(id)
  const token = jwt.sign(
    {
      _id: id,
    },
    refreshTokenSecret,
    {
      expiresIn: '30d',
    }
  )

  await RefreshToken.create({
    token,
    user: id,
  })

  return token
}
