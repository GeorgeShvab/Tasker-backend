import { Request, Response } from 'express'
import { FORBIDDEN, SERVER_ERROR, TAG_NOT_FOUND } from '../../errorMessages'
import validateDbId from '../../utils/validateDbId'
import Tag from '../../models/Tag'
import Task from '../../models/Task'
import validateSort from '../../utils/validateSort'
import validatePeriod from '../../utils/validatePeriod'

const getTasksByTag = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const period = validatePeriod(req.query.period)

    const sort = validateSort(req.query.sort) || '-createdAt'

    if (!validateDbId(id)) {
      return res.status(404).json({ errors: [{ msg: TAG_NOT_FOUND }] })
    }

    const tag = await Tag.findOne({
      _id: id,
    })

    if (!tag) {
      return res.status(404).json({ errors: [{ msg: TAG_NOT_FOUND }] })
    }

    if (String(tag.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    const uncompletedTasksPromise = Task.find({
      $and: [
        { tags: id, completed: false },
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
        { tags: id, completed: true },
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

export default getTasksByTag
