import { genSalt, hash } from 'bcrypt'
import { Request, Response } from 'express'
import User from '../../models/User'
import { IUser } from '../../types'
import { genAccessJwt, genRefreshJwt } from '../../utils/genJwt'

interface ReqBody {
  password: string
  firstName: string
  lastName: string
  email: string
}

const registration = async (req: Request<any, any, ReqBody>, res: Response) => {
  try {
    const { email, password, lastName, firstName } = req.body

    const sameEmailUser = await User.findOne({ email: email })

    if (sameEmailUser) {
      return res.status(400).json({
        errors: [
          {
            param: 'email',
            msg: 'Користувач з таким емейлом вже зареєстрований',
            value: email,
          },
        ],
      })
    }

    const salt = await genSalt(10)

    const hashedPassword = await hash(password, salt)

    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName,
      lastName,
      fullName: firstName + ' ' + lastName,
    })

    const accessToken = genAccessJwt(String(user._id))
    const refreshToken = await genRefreshJwt(String(user._id))

    return res.status(201).json({ accessToken, refreshToken, user })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: 'Помилка серверу' }] })
  }
}

export default registration
