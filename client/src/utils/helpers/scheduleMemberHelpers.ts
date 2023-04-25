import { SelectOptionType } from './../createLeaveHelpers'
import { IScheduleMember } from './../interfaces/scheduleMemberInterface'

export const generateMemberSelect = (scheduleMembers: IScheduleMember[]): SelectOptionType[] => {
  return scheduleMembers.map((member) => ({
    value: member.id.toString(),
    label: member.name
  }))
}
