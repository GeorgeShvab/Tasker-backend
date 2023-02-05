import { TokenExpiredError, verify } from 'jsonwebtoken'

const accessTokenSecret: string | undefined =
  process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret: string | undefined =
  process.env.JWT_REFRESH_TOKEN_SECRET

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new Error('Немає ключів для jwt токенів')
}

export const verifyAccessJwt = (
  token: string
): false | 'TOKEN_EXPIRED' | {} => {
  try {
    const tokenData = verify(token, accessTokenSecret)

    return tokenData
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return 'TOKEN_EXPIRED'
    }

    return false
  }
}

export const verifyRefreshJwt = (
  token: string
): false | 'TOKEN_EXPIRED' | {} => {
  try {
    const tokenData = verify(token, refreshTokenSecret)

    return tokenData
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return 'TOKEN_EXPIRED'
    }

    console.log(e)

    return false
  }
}
