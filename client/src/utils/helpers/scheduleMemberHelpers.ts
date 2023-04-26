import { SelectOptionType } from './../createLeaveHelpers'
import { IGetAllEmployeeSchedule } from '../types/employeeScheduleTypes'
import { IScheduleMember } from './../interfaces/scheduleMemberInterface'

export const generateMemberSelect = (scheduleMembers: IScheduleMember[]): SelectOptionType[] =>
  scheduleMembers.map((member) => ({
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
