type headerType =
  | {
      'nextauth-token': string
    }
  | undefined

export const customHttpHeader = (): headerType => {
  let header
  try {
    const token = localStorage.getItem('cookies') as string
    if (token !== undefined) {
      header = {
        'nextauth-token': token
      }
    }
  } catch (e) {}

  return header
}
