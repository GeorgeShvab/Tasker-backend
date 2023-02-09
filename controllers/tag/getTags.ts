import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import Tag from '../../models/Tag'

const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find({ creator: req.user })
      .sort('-createdAt')
      .populate('tasks')

    return res.status(200).json(tags)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default getTags
