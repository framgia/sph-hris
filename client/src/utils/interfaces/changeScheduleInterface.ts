import { IWorkDay } from './../types/employeeScheduleTypes'

export interface IChangeSchedule {
  leaderIds: number[]
  workingDays: IWorkDay[]
}
