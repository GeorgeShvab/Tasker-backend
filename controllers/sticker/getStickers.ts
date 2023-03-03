import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import Sticker from '../../models/Sticker'
import validateSort from '../../utils/validateSort'

const getStickers = async (req: Request, res: Response) => {
  try {
    const sort = validateSort(req.query.sort) || '-createdAt'

    const stickers = await Sticker.find({
      creator: req.user,
    }).sort(sort)

    return res.status(200).json(stickers)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}
export default getStickers
