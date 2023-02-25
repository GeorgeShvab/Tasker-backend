import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import { INCORRECT_EMAIL_OR_PASSWORD, SERVER_ERROR } from '../../errorMessages'
import User from '../../models/User'
import { genAccessJwt, genRefreshJwt } from '../../utils/genJwt'

interface ReqBody {
  password: string
  email: string
}

const login = async (req: Request<any, any, ReqBody>, res: Response) => {
  try {
    const { password, email } = req.body

    const user = await User.findOne({
      email: email,
    })

    if (!user) {
      return res.status(404).json({
        errors: {
          email: INCORRECT_EMAIL_OR_PASSWORD,
          password: INCORRECT_EMAIL_OR_PASSWORD,
        },
      })
    }

    const comparePasswords = await compare(password, user.password)

    if (!comparePasswords) {
      return res.status(404).json({
        errors: {
          email: INCORRECT_EMAIL_OR_PASSWORD,
          password: INCORRECT_EMAIL_OR_PASSWORD,
        },
      })
    }

    const accessToken = genAccessJwt(user._id)
    const refreshToken = await genRefreshJwt(user._id)

    return res.status(200).json({ accessToken, refreshToken, user })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default login
