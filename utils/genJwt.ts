import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import RefreshToken from '../models/RefreshToken'

dotenv.config({ path: '.env.local' })

const accessTokenSecret: string | undefined =
  process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret: string | undefined =
  process.env.JWT_ACCESS_TOKEN_SECRET

if (!refreshTokenSecret || !accessTokenSecret) {
  throw new Error('Немає ключів для jwt токенів')
}

export const genAccessJwt = (id: string): string => {
  const token = jwt.sign(
    {
      id: id,
    },
    accessTokenSecret,
    {
      expiresIn: '10m',
    }
  )
  return token
}

export const genRefreshJwt = async (id: string): Promise<string> => {
  const token = jwt.sign(
    {
      id: id,
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
