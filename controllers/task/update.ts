import { Request, Response } from 'express'
import { FORBIDDEN, TASK_NOT_FOUND } from '../../errorMessages'
import Tag from '../../models/Tag'
import Task from '../../models/Task'
import validateDbId from '../../utils/validateDbId'

interface ReqBody {
  name: string
  description?: string
  list?: string
  date?: Date
  tags?: string[]
}

const updateTask = async (
  req: Request<{ id: string }, any, ReqBody>,
  res: Response
) => {
  try {
    const { name, description, list, date, tags } = req.body

    const { id } = req.params

    if (!validateDbId(id)) {
      return res.status(404).json({ errors: [{ msg: TASK_NOT_FOUND }] })
    }

    const oldTask = await Task.findOne({
      _id: id,
    })

    if (!oldTask) {
      return res.status(404).json({ errors: [{ msg: TASK_NOT_FOUND }] })
    }

    if (String(oldTask.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    const tagsIds: string[] = tags
      ? await Promise.all(
          tags.map(async (item: string) => {
            const tag = await Tag.findOneOrCreate(
              { name: item, creator: req.user },
              { name: item, creator: req.user }
            )
            return String(tag._id)
          })
        )
      : []

    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        creator: req.user,
      },
      {
        name,
        description: description || null,
        list: list || null,
        date: date ? new Date(date) : null,
        tags: tagsIds,
      }
    )

    return res.status(200).json(task)
  } catch (e) {
    console.log(e)
    return res.status(500).json()
  }
}

export default updateTask
