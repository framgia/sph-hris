import { getCookie } from 'cookies-next'

type headerType =
  | {
      'nextauth-token': string | undefined
      'authorization-token': string | undefined
    }
  | undefined

export const customHttpHeader = (): headerType => {
  let header
  try {
    const token = getCookie('accessToken')?.toString()
    const authtoken = getCookie('authorization')?.toString()
    if (token !== undefined) {
      header = {
        'nextauth-token': token,
        'authorization-token': authtoken
      }
    }
  } catch (e) {}

  return header
}
