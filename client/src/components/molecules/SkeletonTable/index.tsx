import React, { FC } from 'react'

import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

type Props = {
  column: number
  rows?: number
}

const TableSkeleton: FC<Props> = ({ column = 10, rows = 10 }): JSX.Element => {
  return (
    <>
      {Array.from({ length: column }, (_, i) => (
        <tr key={i}>
          <>
            {Array.from({ length: rows }, (__, j) => (
              <td key={j} className="whitespace-nowrap px-6 py-2.5">
                <LineSkeleton />
              </td>
            ))}
          </>
        </tr>
      ))}
    </>
  )
}

export default TableSkeleton
