export type HeatmapDetails = {
  value: number
  day: number
}
export type Heatmap = {
  january: HeatmapDetails[]
  february: HeatmapDetails[]
  march: HeatmapDetails[]
  april: HeatmapDetails[]
  may: HeatmapDetails[]
  june: HeatmapDetails[]
  july: HeatmapDetails[]
  august: HeatmapDetails[]
  september: HeatmapDetails[]
  october: HeatmapDetails[]
  november: HeatmapDetails[]
  december: HeatmapDetails[]
}
export type LeaveTable = {
  date: string
  leaveTypeId: number
  isWithPay: boolean
  reason: string
  numLeaves: number
}
export type Breakdown = {
  sickLeave: number
  undertime: number
  vacationLeave: number
  emergencyLeave: number
  bereavementLeave: number
  maternityLeave: number
  withoutPayTotal: number
  withPayTotal: number
}
export type Leaves = {
  leaves: {
    breakdown: Breakdown
    heatmap: Heatmap
    table: LeaveTable[]
  }
}
