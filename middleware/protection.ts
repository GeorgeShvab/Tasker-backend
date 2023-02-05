import { NextFunction, Request, Response } from 'express'
import { AUTHORIZATION_ERROR, SERVER_ERROR } from '../errorMessages'

const protection = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ errors: [{ msg: AUTHORIZATION_ERROR }] })
    }

    return next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default protection
