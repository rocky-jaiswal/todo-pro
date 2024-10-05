/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useCallback, useEffect } from 'react'

export const useAsync = (
  asyncFunction: () => Promise<unknown>,
  immediate = true
) => {
  const [status, setStatus] = useState<string>('idle')
  const [value, setValue] = useState<unknown | null>(null)
  const [error, setError] = useState<unknown | null>(null)

  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)

    return asyncFunction()
      .then((response: unknown) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error: unknown) => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      void execute()
    }
  }, [execute, immediate])

  return { execute, status, value, error }
}
