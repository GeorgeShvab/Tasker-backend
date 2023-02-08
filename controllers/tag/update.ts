import { Response, Request } from 'express'
import { FORBIDDEN, SERVER_ERROR, TAG_NOT_FOUND } from '../../errorMessages'
import Tag from '../../models/Tag'
import validateDbId from '../../utils/validateDbId'

const updateTag = async (
  req: Request<{ id: string }, any, { name: string; color: string }>,
  res: Response
) => {
  try {
    const { id } = req.params
    const { name, color } = req.body

    if (!validateDbId(id)) {
      return res.status(404).json({ errors: [{ msg: TAG_NOT_FOUND }] })
    }

    const tag = await Tag.findOne({ _id: id })

    if (!tag) {
      return res.status(404).json({ errors: [{ msg: TAG_NOT_FOUND }] })
    }

    if (String(tag.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    const updatedTag = await Tag.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        color,
      }
    )

    return res.status(200).json(updatedTag)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default updateTag
