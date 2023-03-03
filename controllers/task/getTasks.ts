import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import Task from '../../models/Task'
import validatePeriod from '../../utils/validatePeriod'
import validateSort from '../../utils/validateSort'

const getTasks = async (req: Request, res: Response) => {
  try {
    const period = validatePeriod(req.query.period)

    const sort = validateSort(req.query.sort) || '-createdAt'

    const uncompletedTasksPromise = Task.find({
      $and: [
        { creator: req.user, completed: false },
        period
          ? {
              date: {
                $gte: period[0],
                $lt: period[1],
              },
            }
          : {},
      ],
    })
      .sort(sort)
      .populate('tags')
      .populate('list')

    const completedTasksPromise = Task.find({
      $and: [
        { creator: req.user, completed: true },
        period
          ? {
              date: {
                $gte: period[0],
                $lt: period[1],
              },
            }
          : {},
      ],
    })
      .sort(sort)
      //.skip(page * 50) I decided do not use pagination
      //.limit(50)
      .populate('tags')
      .populate('list')

    const [completedTasks, uncompletedTasks] = await Promise.all([
      completedTasksPromise,
      uncompletedTasksPromise,
    ])

    return res.status(200).json({ completedTasks, uncompletedTasks })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default getTasks
