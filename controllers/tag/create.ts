import { Request, Response } from 'express'
import { SERVER_ERROR, TAG_ALREADY_EXISTS_ERROR } from '../../errorMessages'
import Tag from '../../models/Tag'

const createTag = async (
  req: Request<any, any, { name: string }>,
  res: Response
) => {
  try {
    const { name } = req.body

    const sameNameTag = await Tag.findOne({
      name,
      creator: req.user,
    })

    if (sameNameTag) {
      return res
        .status(400)
        .json({ errors: [{ msg: TAG_ALREADY_EXISTS_ERROR }] })
    }

    const tag = await Tag.create({
      name,
      creator: req.user,
    })

    return res.status(201).json(tag)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default createTag
