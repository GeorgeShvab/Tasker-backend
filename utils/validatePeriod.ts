import { Period } from '../types'

const periods: Period[] = ['today', 'tomorrow', 'week', 'next_week']

const day = 1000 * 60 * 60 * 24
const week = day * 7

const validatePeriod = (value: any): [string, string] | null => {
  if (value) {
    if (periods.some((item) => item === String(value))) {
      if (value === 'today') {
        return [
          new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
          new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString(),
        ]
      } else if (value === 'tomorrow') {
        return [
          new Date(new Date().setUTCHours(0, 0, 0, 0) + day).toISOString(),
          new Date(new Date().setUTCHours(23, 59, 59, 999) + day).toISOString(),
        ]
      } else if (value === 'week') {
        const first = new Date().getDate() - new Date().getDay()
        const last = first + 6

        return [
          new Date(
            new Date(new Date().setDate(first + 1)).setUTCHours(0, 0, 0, 0)
          ).toISOString(), // add one because in js first day of the week is a Sunday, but I need it to be Monday
          new Date(
            new Date(new Date().setDate(last + 1)).setUTCHours(23, 59, 59, 999)
          ).toISOString(), // add one because in js first day of the week is a Sunday, but I need it to be Monday
        ]
      } else if (value === 'next_week') {
        const first = new Date().getDate() - new Date().getDay()
        const last = first + 6

        return [
          new Date(
            new Date(new Date().setDate(first + 1) + week).setUTCHours(
              0,
              0,
              0,
              0
            )
          ).toISOString(), // add one because in js first day of the week is a Sunday, but I need it to be Monday
          new Date(
            new Date(new Date().setDate(last + 1) + week).setUTCHours(
              23,
              59,
              59,
              999
            )
          ).toISOString(), // add one because in js first day of the week is a Sunday, but I need it to be Monday
        ]
      }
    }
  }

  return null
}

export default validatePeriod
