'use client'

import { useState, useEffect } from 'react'

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const matchQueryList = window.matchMedia(query)

    setMatches(matchQueryList.matches)

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    matchQueryList.addEventListener('change', handleChange)

    return () => {
      matchQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
