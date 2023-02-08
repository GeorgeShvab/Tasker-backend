import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import Task from '../../models/Task'
import validateNumber from '../../utils/validateNumber'
import validateSort from '../../utils/validateSort'

const getTasks = async (req: Request, res: Response) => {
  try {
    const status: boolean | null =
      req.query.status === 'completed'
        ? true
        : req.query.status === 'uncompleted'
        ? false
        : null

    const page: number = validateNumber(req.query.page) || 0

    const sort = validateSort(req.query.sort) || '-createdAt'

    const tasks = await Task.find({
      $and: [
        { creator: req.user },
        { completed: status === null ? { $exists: true } : status },
      ],
    })
      .sort(sort)
      .skip(page * 50)
      .limit(50)
      .populate('tags')
      .populate('list')

    return res.status(200).json(tasks)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default getTasks
