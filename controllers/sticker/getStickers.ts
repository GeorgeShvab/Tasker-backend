import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import Sticker from '../../models/Sticker'
import validateNumber from '../../utils/validateNumber'
import validateSort from '../../utils/validateSort'

const getStickers = async (req: Request, res: Response) => {
  try {
    const page: number = validateNumber(req.query.page) || 0

    const sort = validateSort(req.query.sort) || '-createdAt'

    const stickers = await Sticker.find({
      creator: req.user,
    }).sort(sort)
    //.skip(page * 50) I decided do not use pagination
    //.limit(50)

    return res.status(200).json(stickers)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}
export default getStickers
