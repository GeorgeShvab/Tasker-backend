import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    next()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: 'Помилка серверу' }] })
  }
}

export default validator
