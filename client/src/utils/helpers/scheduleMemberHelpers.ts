import { SelectOptionType } from './../createLeaveHelpers'
import { IGetAllEmployeeSchedule } from '../types/employeeScheduleTypes'
import { User } from '../types/userTypes'

export const generateMemberSelect = (scheduleMembers: User[]): SelectOptionType[] =>
  scheduleMembers?.map((member) => ({
    value: member.id.toString(),
    label: member.name
  }))

export const generateScheduleSelect = (
  employeeSchedules: IGetAllEmployeeSchedule[]
): SelectOptionType[] =>
  employeeSchedules.map((schedule) => ({
    value: schedule.id.toString(),
    label: schedule.scheduleName
  }))
