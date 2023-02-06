import { Request, Response } from 'express'
import User from '../../models/User'
import { SERVER_ERROR, USER_NOT_FOUND } from '../../errorMessages'

const changeMode = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.user,
    })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: USER_NOT_FOUND }] })
    }

    await User.updateOne(
      {
        _id: req.user,
      },
      { mode: user.mode === 'light' ? 'dark' : 'light' }
    )

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default changeMode
