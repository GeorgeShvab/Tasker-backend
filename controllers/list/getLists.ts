import { Response, Request } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import List from '../../models/List'

const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find({
      creator: req.user,
    })
      .sort('-createdAt')
      .populate('tasks')

    return res.status(200).json(lists)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default getLists
