import { Types } from 'mongoose'

const validateDbId = (value: string): boolean => {
  return Types.ObjectId.isValid(value)
}

export default validateDbId
