import React, { FC } from 'react'
import classNames from 'classnames'
import { Search } from 'react-feather'

type Props = {
  setSearchedVal: React.Dispatch<React.SetStateAction<string>>
}

const CustomSearch: FC<Props> = ({ setSearchedVal }): JSX.Element => {
  return (
    <div className="group flex w-full items-center space-x-2 py-2 pr-3">
      <Search className="h-4 w-4 shrink-0 text-slate-400 group-focus-within:text-amber-500" />
      <input
        placeholder="Search schedule"
        onChange={(e) => setSearchedVal(e.target.value)}
        className={classNames(
          'w-full py-2 text-[13px] placeholder:font-normal',
          'placeholder:text-slate-400 focus:outline-none'
        )}
      />
    </div>
  )
}

export default CustomSearch
