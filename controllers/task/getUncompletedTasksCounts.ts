import { Request, Response } from 'express'
import Task from '../../models/Task'
import validatePeriod from '../../utils/validatePeriod'

const getUncompletedTasksCounts = async (req: Request, res: Response) => {
  try {
    const allCount = Task.count({
      creator: req.user,
      completed: false,
    })

    const todayPeriod = validatePeriod('today')

    const todayCount = Task.count({
      creator: req.user,
      completed: false,
      date: {
        $gte: todayPeriod[0],
        $lt: todayPeriod[1],
      },
    })

    const upcomingPeriod = validatePeriod('upcoming')

    const upcomingCount = Task.count({
      creator: req.user,
      completed: false,
      date: {
        $gte: upcomingPeriod[0],
        $lt: upcomingPeriod[1],
      },
    })

    const [all, today, upcoming] = await Promise.all([
      allCount,
      todayCount,
      upcomingCount,
    ])

    return res.status(200).json({ all, today, upcoming })
  } catch (e) {}
}

export default getUncompletedTasksCounts
