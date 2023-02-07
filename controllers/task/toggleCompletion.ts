import { Request, Response } from 'express'
import { FORBIDDEN, SERVER_ERROR, TASK_NOT_FOUND } from '../../errorMessages'
import Task from '../../models/Task'

const toggleCompletion = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params

  try {
    const task = await Task.findOne({
      _id: id,
    })

    if (!task) {
      return res.status(404).json({ errors: [{ msg: TASK_NOT_FOUND }] })
    }

    if (String(task.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    await Task.updateOne(
      {
        _id: id,
      },
      { completed: !task.completed }
    )

    return res.status(200).json()
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default toggleCompletion
