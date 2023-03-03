import { Request, Response } from 'express'
import { FORBIDDEN, LIST_NOT_FOUND, SERVER_ERROR } from '../../errorMessages'
import List from '../../models/List'
import Task from '../../models/Task'
import validateDbId from '../../utils/validateDbId'
import validatePeriod from '../../utils/validatePeriod'
import validateSort from '../../utils/validateSort'

const getTasksByList = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const period = validatePeriod(req.query.period)

    const sort = validateSort(req.query.sort) || '-createdAt'

    if (!validateDbId(id)) {
      return res.status(404).json({ errors: [{ msg: LIST_NOT_FOUND }] })
    }

    const list = await List.findOne({ _id: id })

    if (!list) {
      return res.status(404).json({ errors: [{ msg: LIST_NOT_FOUND }] })
    }

    if (String(list.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    const uncompletedTasksPromise = Task.find({
      $and: [
        { list: id, completed: false },
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
        { list: id, completed: true },
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

export default getTasksByList
