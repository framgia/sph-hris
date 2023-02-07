import { User } from '~/utils/types/userTypes'

export type optionType = {
  label: string
  value: number
}

export const usersSelectOptions = (users: User[]): optionType[] => {
  const result: optionType[] = []

  users.forEach((user) => {
    result.push({ label: user.name, value: user.id })
  })

  return result
}

export const yearSelectOptions = (years: number[]): optionType[] => {
  const result: optionType[] = []

  years.forEach((year) => {
    result.push({ label: year.toString(), value: year })
  })

  return result
}
