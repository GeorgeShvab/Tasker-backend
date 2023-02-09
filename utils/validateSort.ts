const sortTypes = [
  '-createdAt',
  'createdAt',
  'completed',
  '-completed',
  '-name',
  'name',
  'date',
  '-date',
  'updatedAt',
  '-updatedAt',
]

const validateSort = (value: any): string | null => {
  if (value && sortTypes.some((item) => item === value)) {
    return String(value)
  }

  return null
}

export default validateSort
