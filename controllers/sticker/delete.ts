import { Request, Response } from 'express'
import { FORBIDDEN, SERVER_ERROR, STICKER_NOT_FOUND } from '../../errorMessages'
import Sticker from '../../models/Sticker'
import validateDbId from '../../utils/validateDbId'

const deleteSticker = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    if (!validateDbId(id)) {
      return res.status(404).json({ errors: [{ msg: STICKER_NOT_FOUND }] })
    }

    const sticker = await Sticker.findOne({ _id: id })

    if (!sticker) {
      return res.status(404).json({ errors: [{ msg: STICKER_NOT_FOUND }] })
    }

    if (String(sticker.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    await Sticker.deleteOne({
      _id: id,
    })

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default deleteSticker
