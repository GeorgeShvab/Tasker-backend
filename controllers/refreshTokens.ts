import { Request, Response } from 'express'
import {
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_EXPIRED_ERROR,
  SERVER_ERROR,
} from '../errorMessages'
import RefreshToken from '../models/RefreshToken'
import { genRefreshJwt, genAccessJwt } from '../utils/genJwt'
import { verifyRefreshJwt } from '../utils/verifyJwt'

const refreshTokens = async (req: Request, res: Response) => {
  try {
    const userRefreshToken: string | undefined =
      typeof req.headers.refresh === 'string' ? req.headers.refresh : undefined

    if (!userRefreshToken) {
      return res.status(400).json({ errors: [{ msg: REFRESH_TOKEN_ERROR }] })
    }

    const tokenData = verifyRefreshJwt(userRefreshToken)

    if (!tokenData) {
      return res.status(400).json({ errors: [{ msg: REFRESH_TOKEN_ERROR }] })
    }

    const deletionData = await RefreshToken.deleteOne({
      token: userRefreshToken,
    })

    if (!deletionData.deletedCount) {
      return res.status(400).json({ errors: [{ msg: REFRESH_TOKEN_ERROR }] })
    }

    if (tokenData === 'TOKEN_EXPIRED') {
      return res
        .status(400)
        .json({ errors: [{ msg: REFRESH_TOKEN_EXPIRED_ERROR }] })
    }

    const refreshToken = await genRefreshJwt(req.user)
    const accessToken = genAccessJwt(req.user)

    return res.status(200).json({ accessToken, refreshToken })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default refreshTokens
