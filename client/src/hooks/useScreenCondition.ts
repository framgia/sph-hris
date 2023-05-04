import { useState, useEffect } from 'react'

const useScreenCondition = (condition: string): boolean => {
  const [isConditionMet, setIsConditionMet] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = (): void => {
      const conditionMet = window.matchMedia(condition).matches
      setIsConditionMet(conditionMet)
    }

    // set initial condition
    handleResize()

    // add event listener for resizing
    window.addEventListener('resize', handleResize)

    // clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [condition])

  return isConditionMet
}

export default useScreenCondition
