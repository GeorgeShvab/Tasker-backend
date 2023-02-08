const validateNumber = (value: any): number | null => {
  if (isNaN(Number(value))) {
    return null
  }

  return Number(value)
}

export default validateNumber
