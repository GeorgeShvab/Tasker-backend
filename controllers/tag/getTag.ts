import { Request, Response } from 'express'
import { FORBIDDEN, SERVER_ERROR, TAG_NOT_FOUND } from '../../errorMessages'
import Tag from '../../models/Tag'
import validateDbId from '../../utils/validateDbId'

const getTag = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    if (!validateDbId(id)) {
      return res.status(404).json({ errors: [{ msg: TAG_NOT_FOUND }] })
    }

    const tag = await Tag.findOne({ _id: id }).populate('tasks')

    if (!tag) {
      return res.status(404).json({ errors: [{ msg: TAG_NOT_FOUND }] })
    }

    if (String(tag.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    return res.status(200).json(tag)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default getTag
