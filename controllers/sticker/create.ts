import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import Sticker from '../../models/Sticker'

const createSticker = async (
  req: Request<any, any, { name: string; description?: string }>,
  res: Response
) => {
  try {
    const { name, description } = req.body

    const sticker = await Sticker.create({
      name,
      description: description || null,
      creator: req.user,
    })

    return res.status(201).json(sticker)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default createSticker
