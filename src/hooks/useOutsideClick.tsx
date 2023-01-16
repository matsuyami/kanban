import { useEffect } from 'react'

export const useOutsideClick = (ref, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [ref, onClickOutside])
}
