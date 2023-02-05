import { Request, Response, NextFunction } from 'express'
import { SERVER_ERROR } from '../errorMessages'
import { verifyAccessJwt } from '../utils/verifyJwt'

const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined =
      typeof req.headers.authorization === 'string'
        ? req.headers.authorization
        : undefined

    if (!token) {
      return next()
    }

    const tokenData = verifyAccessJwt(token)

    if (!tokenData) {
      return next()
    }

    if (tokenData === 'TOKEN_EXPIRED') {
      return res
        .status(418)
        .json({ errors: [{ msg: 'Час дії токена для авторизації вийшов' }] }) // 418 because I want don't want to use 403 (My server returns 403 if user is authorized but want to do actions with not his tasks or something similar)
    }

    if (typeof tokenData === 'string') {
      return next()
    }

    if (tokenData._id) {
      req.user = tokenData._id
    }

    return next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default authorization
