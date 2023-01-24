import { IInterruptionTimeEntry } from '../interfaces'

export type InterruptionType = {
  id: number
  name: string
}

export type WorkInterruptionType = {
  allWorkInterruptionTypes: InterruptionType[]
}

export type WorkInterruption = {
  id: number
  timeOut: string
  timeIn: string
  otherReason: string
  remarks: string
  workInterruptionType: InterruptionType
}
export type WorkInterruptions = {
  interruptionsByTimeEntryId: IInterruptionTimeEntry[]
}
