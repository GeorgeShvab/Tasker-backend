import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import User from '../../models/User'

interface ReqBody {
  firstName: string
  lastName: string
}

const updateName = async (req: Request<any, any, ReqBody>, res: Response) => {
  try {
    const { firstName, lastName } = req.body

    await User.updateOne(
      { _id: req.user },
      {
        firstName: firstName,
        lastName: lastName,
        fullName: firstName + ' ' + lastName,
      }
    )

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default updateName
