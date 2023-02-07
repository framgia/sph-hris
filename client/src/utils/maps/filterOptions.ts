import { User } from '~/utils/types/userTypes'

export type optionType = {
  label: string
  value: number
}

export const usersSelectOptions = (users: User[]): optionType[] => {
  return users.map((user) => {
    return { label: user.name, value: user.id }
  })
}

export const yearSelectOptions = (years: number[]): optionType[] => {
  return years.map((year) => {
    return { label: year.toString(), value: year }
  })
}
