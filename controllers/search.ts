import { Response, Request } from 'express'
import { SEARCH_NOT_FOUND, SERVER_ERROR } from '../errorMessages'
import Sticker from '../models/Sticker'
import Task from '../models/Task'
import validateNumber from '../utils/validateNumber'
import validateSort from '../utils/validateSort'

const search = async (req: Request, res: Response) => {
  try {
    const query = decodeURI(String(req.query.query).trim())

    const page: number = validateNumber(req.query.page) || 0

    const sort = validateSort(req.query.sort) || '-createdAt'

    const tasks = await Task.find({
      $text: { $search: query },
    })
      .sort(sort)
      //.skip(page * 50) I decided do not use pagination
      //.limit(50)
      .populate('tags')
      .populate('list')

    const stickers = await Sticker.find({
      $text: { $search: query },
    }).sort(sort)
    //.skip(page * 50) I decided do not use pagination
    //.limit(50)

    return res.status(200).json({ stickers, tasks })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default search
