import toast from 'react-hot-toast'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { confirmAlert } from 'react-confirm-alert'
import React, { FC, ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ChevronDown, Plus, Trash2 } from 'react-feather'

import Layout from './../Layout'
import CustomSearch from './CustomSearch'
import Card from '~/components/atoms/Card'
import { queryClient } from '~/lib/queryClient'
import useUserQuery from '~/hooks/useUserQuery'
import Button from '~/components/atoms/Buttons/Button'
import useEmployeeSchedule from '~/hooks/useEmployeeSchedule'
import ButtonAction from '~/components/atoms/Buttons/ButtonAction'
import MaxWidthContainer from '~/components/atoms/MaxWidthContainer'
import { IGetAllEmployeeSchedule } from '~/utils/types/employeeScheduleTypes'

type Props = {
  children: ReactNode
  metaTitle: string
}

const ScheduleManagementLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()
  const [searchedVal, setSearchedVal] = useState<string>('')
  const [isOpenSchedule, setIsOpenSchedule] = useState<boolean>(false)
  const { getAllEmployeeScheduleQuery } = useEmployeeSchedule()
  const { data } = getAllEmployeeScheduleQuery()
  const allEmployeeSchedule = data?.allEmployeeScheduleDetails

  const handleOpenScheduleToggle = (): void => setIsOpenSchedule(!isOpenSchedule)

  return (
    <Layout
      {...{
        metaTitle
      }}
    >
      <div className="flex h-full min-h-screen flex-col text-xs text-slate-500 lg:flex-row">
        <aside className="w-full shrink-0 border-b border-r border-slate-200 bg-white lg:w-[240px]">
          <div
            className={classNames(
              'flex items-center px-4',
              !isOpenSchedule ? 'border-b border-slate-200' : ''
            )}
          >
            <CustomSearch
              {...{
                setSearchedVal
              }}
            />
            <Button
              type="button"
              onClick={handleOpenScheduleToggle}
              className={classNames(
                'text-slate-400 opacity-100 transition duration-75',
                'ease-in-out hover:text-slate-600 lg:opacity-0'
              )}
            >
              <ChevronDown
                className={`h-4 w-4 duration-300 ${isOpenSchedule ? '-rotate-90' : ''}`}
              />
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {!isOpenSchedule ? (
              <motion.nav animate={{ height: 'auto' }} initial={{ height: 0 }} exit={{ height: 0 }}>
                <div className="py-2">
                  <Button
                    type="button"
                    className={classNames(
                      'flex w-full items-center space-x-2 px-4 py-2',
                      'text-amber-600 transition duration-75',
                      'ease-in-out hover:bg-amber-50'
                    )}
                    onClick={() => {
                      void router.replace({
                        pathname: router.pathname
                      })
                    }}
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add New Schedule</span>
                  </Button>
                </div>
                <ul className="flex flex-col space-y-1">
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
                          ...item
                        }}
                      />
                    ))}
                </ul>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </aside>
        <div className="default-scrollbar h-full flex-1 overflow-y-auto">
          <MaxWidthContainer maxWidth="max-w-[900px]" className="mx-auto px-4 py-4 lg:py-5">
            <Card className="mb-24">{children}</Card>
          </MaxWidthContainer>
        </div>
      </div>
    </Layout>
  )
}

ScheduleManagementLayout.defaultProps = {
  metaTitle: 'Schedule Management'
}

const ScheduleItem = (item: IGetAllEmployeeSchedule): JSX.Element => {
  const router = useRouter()
  const id = Number(router.query.id)
  const { handleUserQuery } = useUserQuery()
  const { data: user } = handleUserQuery()
  const { handleDeleteEmployeeScheduleMutation } = useEmployeeSchedule()
  const deleteEmployeeScheduleMutation = handleDeleteEmployeeScheduleMutation()
  const active = item.id === id

  // FOR CONFIRMATION ONLY
  const handleRemoveConfirmation = (item: IGetAllEmployeeSchedule): void => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Card className="w-full max-w-xs px-8 py-6" shadow-size="xl" rounded="lg">
            <h1 className="text-center text-xl font-bold">Confirmation</h1>
            <p className="mt-2 text-sm font-medium">
              Are you sure you want to delete{' '}
              <b className="text-amber-500 underline">{item.scheduleName}</b> schedule?
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white">
              <ButtonAction
                variant="danger"
                onClick={() => handleDeleteSchedule(onClose)}
                className="w-full py-1 px-4"
              >
                Yes
              </ButtonAction>
              <ButtonAction
                onClick={onClose}
                variant="secondary"
                className="w-full py-1 px-4 text-slate-500"
              >
                No
              </ButtonAction>
            </div>
          </Card>
        )
      }
    })
  }

  // THIS WILL MUTATE THE DELETE ACTION
  const handleDeleteSchedule = (onClose: () => void): void => {
    deleteEmployeeScheduleMutation.mutate(
      {
        employeeScheduleId: Number(id),
        userId: user?.userById.id as number
      },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: ['GET_ALL_EMPLOYEE_SCHEDULE']
          })
          void router.replace({
            pathname: router.pathname
          })
          toast.success('Deleted Successfully!')
        },
        onSettled: () => {
          onClose()
        }
      }
    )
  }

  return (
    <li
      className={classNames(
        'group flex w-full items-center justify-between',
        'py-2 px-4 transition duration-75 ease-in-out',
        'cursor-pointer select-none hover:bg-amber-50',
        active ? 'bg-amber-50 text-amber-600 hover:text-amber-600' : ''
      )}
      onClick={(e) => {
        e.preventDefault()
        void router.replace({
          pathname: router.pathname,
          query: {
            id: item.id
          }
        })
      }}
    >
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 stroke-1" />
        <span>{item.scheduleName}</span>
      </div>
      <div className={classNames('group-hover:opacity-100', active ? 'opacity-100' : 'opacity-0 ')}>
        <Button type="button" onClick={() => handleRemoveConfirmation(item)}>
          <Trash2 className="h-5 w-5 stroke-1" />
        </Button>
      </div>
    </li>
  )
}

export default ScheduleManagementLayout
