import moment from 'moment'
import React, { FC } from 'react'

import Text from '~/components/atoms/Text'
import { User } from '~/utils/types/userTypes'
import Avatar from '~/components/atoms/Avatar'
import handleImageError from '~/utils/handleImageError'

type Props = {
  user: User | undefined
}

const UserTimeZone: FC<Props> = ({ user }): JSX.Element => {
  return (
    <div className="flex items-center space-x-3 border-b border-slate-200 py-3">
      <Avatar
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          handleImageError(e, '/images/default.png')
        }
        src={user?.avatarLink}
        alt="user-avatar"
        size="lg"
        rounded="full"
      />
      <div>
        <Text
          theme="md"
          size="sm"
          weight="semibold"
          className="font-inter !text-slate-600 line-clamp-1"
        >
          {user?.name}
        </Text>
        <p className="text-[11px] leading-tight text-slate-500">
          Clocking from {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
        <p className="text-[11px] leading-tight text-slate-500">
          {moment(new Date()).format('dddd, MMMM Do YYYY')}
        </p>
        <p className="text-[11px] leading-tight text-slate-500">
          Schedule: {user?.employeeSchedule.name}
        </p>
      </div>
    </div>
  )
}

UserTimeZone.defaultProps = {}

export default UserTimeZone
