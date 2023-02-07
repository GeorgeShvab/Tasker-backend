import { Request, Response } from 'express'
import { Document } from 'mongoose'
import { SERVER_ERROR } from '../../errorMessages'
import Tag from '../../models/Tag'
import Task from '../../models/Task'
import { ITask } from '../../types'

interface ReqBody {
  name: string
  description?: string
  list?: string
  date?: Date
  tags?: string[]
}

const createTask = async (req: Request<any, any, ReqBody>, res: Response) => {
  try {
    const { name, description, list, date, tags } = req.body

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

    const task = await Task.create({
      name,
      description: description || null,
      list: list || null,
      date: date ? new Date(date) : null,
      tags: tagsIds,
      creator: req.user,
    })

    return res.status(201).json(task)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default createTask
