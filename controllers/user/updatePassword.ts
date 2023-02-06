import { compare, genSalt, hash } from 'bcrypt'
import { Request, Response } from 'express'
import { INCORRECT_OLD_PASSWORD, SERVER_ERROR } from '../../errorMessages'
import User from '../../models/User'

interface ReqBody {
  password: string
  oldPassword: string
}

const updatePassword = async (
  req: Request<any, any, ReqBody>,
  res: Response
) => {
  try {
    const { password, oldPassword } = req.body

    const user = await User.findOne({
      _id: req.user,
    })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: INCORRECT_OLD_PASSWORD }] })
    }

    const passwordComparison = await compare(oldPassword, user.password)

    if (!passwordComparison) {
      return res.status(400).json({ errors: [{ msg: INCORRECT_OLD_PASSWORD }] })
    }

    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    await User.updateOne(
      {
        _id: req.user,
      },
      {
        password: hashedPassword,
      }
    )

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default updatePassword
