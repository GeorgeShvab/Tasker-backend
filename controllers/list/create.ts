import { Request, Response } from 'express'
import { SERVER_ERROR } from '../../errorMessages'
import List from '../../models/List'

interface ReqBody {
  name: string
}

const createList = async (req: Request<any, any, ReqBody>, res: Response) => {
  try {
    const { name } = req.body

    const list = await List.create({
      name,
      creator: req.user,
    })

    return res.status(201).json(list)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default createList
