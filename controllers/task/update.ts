import { Request, Response } from 'express'
import { FORBIDDEN, TASK_NOT_FOUND } from '../../errorMessages'
import Tag from '../../models/Tag'
import Task from '../../models/Task'

interface ReqBody {
  name: string
  description?: string
  list?: string
  date?: Date
  tags?: string[]
  id: string
}

const updateTask = async (req: Request, res: Response) => {
  try {
    const { name, description, id, list, date, tags } = req.body

    const oldTask = await Task.findOne({
      _id: id,
    })

    if (!oldTask) {
      return res.status(404).json({ errors: [{ msg: TASK_NOT_FOUND }] })
    }

    if (String(oldTask.creator) !== req.user) {
      return res.status(404).json({ errors: [{ msg: FORBIDDEN }] })
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
