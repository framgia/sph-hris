import toast from 'react-hot-toast'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { client } from '~/utils/shared/client'
import { IEmployeeInput } from '~/utils/interfaces/employeeInterface'
import { CREATE_NEW_EMPLOYEE_MUTATION } from '~/graphql/mutations/employeeMutation'

type EmployeeFuncReturnType = UseMutationResult<any, Error, IEmployeeInput, unknown>

type HookReturnType = {
  handleAddNewEmployeeMutation: () => UseMutationResult<any, Error, IEmployeeInput, unknown>
}

const useEmployee = (): HookReturnType => {
  const handleAddNewEmployeeMutation = (): EmployeeFuncReturnType =>
    useMutation({
      mutationFn: async (request: IEmployeeInput) => {
        return await client.request(CREATE_NEW_EMPLOYEE_MUTATION, { request })
      },
      onError: async (err: Error) => {
        const [errorMessage] = err.message.split(/:\s/, 2)
        toast.error(errorMessage)
      }
    })

  return {
    handleAddNewEmployeeMutation
  }
}

export default useEmployee
