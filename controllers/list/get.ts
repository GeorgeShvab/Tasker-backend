import { Request, Response } from 'express'
import { FORBIDDEN, LIST_NOT_FOUND, SERVER_ERROR } from '../../errorMessages'
import List from '../../models/List'
import validateDbId from '../../utils/validateDbId'

const getList = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    if (!validateDbId(id)) {
      return res.status(404).json({ errors: [{ msg: LIST_NOT_FOUND }] })
    }

    const list = await List.findOne({
      _id: id,
    })

    if (!list) {
      return res.status(404).json({ errors: [{ msg: LIST_NOT_FOUND }] })
    }

    if (String(list.creator) !== req.user) {
      return res.status(403).json({ errors: [{ msg: FORBIDDEN }] })
    }

    return res.status(200).json(list)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default getList
