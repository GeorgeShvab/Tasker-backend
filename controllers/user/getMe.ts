import { Request, Response } from 'express'
import { SERVER_ERROR, USER_NOT_FOUND } from '../../errorMessages'
import User from '../../models/User'

const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user })

    if (!user) {
      return res.status(404).json({ errors: [{ msg: USER_NOT_FOUND }] })
    }

    return res.status(200).json(user)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default getMe
