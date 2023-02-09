import { Request, Response } from 'express'
import { FORBIDDEN, LIST_NOT_FOUND, SERVER_ERROR } from '../../errorMessages'
import List from '../../models/List'
import Task from '../../models/Task'
import validateDbId from '../../utils/validateDbId'
import validateNumber from '../../utils/validateNumber'
import validatePeriod from '../../utils/validatePeriod'
import validateSort from '../../utils/validateSort'

const getTasksByList = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const status: boolean | null =
      req.query.status === 'completed'
        ? true
        : req.query.status === 'uncompleted'
        ? false
        : null

    const page: number = validateNumber(req.query.page) || 0

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

    const tasks = await Task.find({
      $and: [
        { list: id },
        status === null ? {} : { completed: status },
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

export default getTasksByList
