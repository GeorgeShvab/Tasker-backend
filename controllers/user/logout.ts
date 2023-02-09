import { Request, Response } from 'express'
import { SERVER_ERROR, REFRESH_TOKEN_ERROR } from '../../errorMessages'
import RefreshToken from '../../models/RefreshToken'

const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken =
      typeof req.headers.refresh === 'string' ? req.headers.refresh : undefined

    if (!refreshToken) {
      return res.status(400).json({ errors: [{ msg: REFRESH_TOKEN_ERROR }] })
    }

    await RefreshToken.deleteOne({
      token: refreshToken,
      user: req.user,
    })

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default logout
