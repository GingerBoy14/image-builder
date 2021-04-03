import { useEffect } from 'react'

/**
 * @info useOutsideClick (27 Mar 2021) // CREATION DATE
 *
 * @comment useOutsideClick - React hook.
 *
 * @since 03 Apr 2021 ( v.0.0.2 ) // LAST-EDIT DATE
 *
 * @param {MutableRefObject}     ref
 * @param {function}             callback     Function that call on outside click.
 *
 * @return {void}
 */

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export default useOutsideClick
