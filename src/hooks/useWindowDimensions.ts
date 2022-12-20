import { useState, useEffect } from 'react'

export type WindowDimensions = {
  width: number,
  height: number
}

function getWindowDimensions(): WindowDimensions {
  if (typeof window === 'undefined') return { width: 0, height: 0 }
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    { width: 0, height: 0 }
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowDimensions
}
