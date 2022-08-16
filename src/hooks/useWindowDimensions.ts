import { useState, useEffect } from 'react'

// Note: window must be defined for this hook to work

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  return windowDimensions
}
