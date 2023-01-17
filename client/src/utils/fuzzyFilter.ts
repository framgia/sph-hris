import { FilterFn } from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  try {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  } catch {
    return false
  }
}
