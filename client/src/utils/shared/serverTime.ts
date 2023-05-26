import moment from 'moment'

export const serverTime = (): string => {
  return moment().utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
}
