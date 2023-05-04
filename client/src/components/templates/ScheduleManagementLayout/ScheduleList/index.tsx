import React, { FC } from 'react'

import ScheduleItem from './ScheduleItem'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'

type Props = {
  searchedVal: string
  closeModal?: () => void
}

const ScheduleList: FC<Props> = ({ searchedVal, closeModal }): JSX.Element => {
  // EMPLOYEE SCHEDULE HOOKS
  const { getAllEmployeeScheduleQuery } = useEmployeeSchedule()
  const { data } = getAllEmployeeScheduleQuery()
  const allEmployeeSchedule = data?.allEmployeeScheduleDetails

  return (
    <>
      {allEmployeeSchedule
        ?.filter(
          (row) =>
            searchedVal?.length === 0 ||
            row?.scheduleName
              .toString()
              .toLowerCase()
              .includes(searchedVal.toString().toLowerCase())
        )
        ?.map((item) => (
          <ScheduleItem
            key={item.id}
            {...{
              item,
              closeModal
            }}
          />
        ))}
    </>
  )
}

export default ScheduleList
