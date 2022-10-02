import { useEffect } from "react"

export default function useHandleElementWithIdClicked(
  clickId: string,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (event.target.id === clickId) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
}
