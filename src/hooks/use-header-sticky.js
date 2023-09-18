import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useHeaderSticky = () => {
  // Windown scroll to sticky
  const headerRef = useRef(null)

  const [headerHeight, setHeaderHeight] = useState(0)
  const [stIsSticky, setIsSticky] = useState(false)

  // Check resize chagne height
  const setHeightHeader = useCallback(() => {
    const headerHeight = headerRef.current?.getBoundingClientRect().height

    headerHeight && setHeaderHeight(headerHeight)
  }, [headerRef, setHeaderHeight])

  // Run CLient first
  useEffect(() => {
    window.addEventListener('resize', setHeightHeader)

    // component didmount
    return () => {
      window.removeEventListener('resize', setHeightHeader)
    }
  }, [setHeightHeader])

  // Set sticky on sctroll
  const { scrollY } = useScroll()

  const spaceToRun = 0

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!stIsSticky && latest > spaceToRun) {
      // Some time get data delay height header
      setHeightHeader()
      setIsSticky(true)
    } else if (stIsSticky && latest <= spaceToRun) {
      setIsSticky(false)
    }

    // if (
    //   headerHeight < latest &&
    //   latest < headerHeight + spaceToRun &&
    //   !stIsSticky
    // ) {
    //   // Some time get data delay height header
    //   setHeightHeader()
    // } else if (latest >= headerHeight + spaceToRun && !stIsSticky) {
    //   setIsSticky(true)
    // } else if (latest < headerHeight + spaceToRun && stIsSticky) {
    //   setIsSticky(false)
    // }
  })

  return { headerRef, stIsSticky, headerHeight, setIsSticky }
}
