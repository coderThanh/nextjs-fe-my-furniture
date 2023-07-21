import classNames from 'classnames'

import { useCallback, useEffect, useRef, useState } from 'react'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import HeaderBottom from './header-bottom'
import HeaderMid from './header-mid'
import HeaderMobileMid from './header-mobile-mid'

// Defint class tag
export const classMenuItem = 'menu-item'
export const classMenuLink = 'menu-link'
export const classMenuIcon = 'menu-icon'
export const classMenuSub = 'menu-sub'
export const classMenuSubFull = 'menu-sub_full'
export const classNav = 'nav'
export const classHasChildren = 'has-children'
export const classChildrenLink = 'children-link'
export const classFull = 'full'

export default function Header() {
  // Windown scroll to sticky
  const headerRef = useRef(null)

  const [headerHeight, setHeaderHeight] = useState(0)
  const [stateIsSticky, setIsSticky] = useState(false)

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

  const spaceToRun = 800

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (
      headerHeight < latest &&
      latest < headerHeight + spaceToRun &&
      !stateIsSticky
    ) {
      // Some time get data delay height header
      setHeightHeader()
    } else if (latest >= headerHeight + spaceToRun && !stateIsSticky) {
      setIsSticky(true)
    } else if (latest < headerHeight + spaceToRun && stateIsSticky) {
      setIsSticky(false)
    }
  })

  // Animation variabnle
  const variants = {
    sticking: { y: [-100, 0] },
    normal: { y: '' },
  }

  return (
    <header
      className={classNames('header-wrap', { sticky: stateIsSticky })}
      style={{
        height: stateIsSticky ? headerHeight : undefined,
      }}
    >
      <motion.div
        ref={headerRef}
        className={classNames('header-inner ')}
        animate={stateIsSticky ? 'sticking' : 'normal'}
        variants={variants}
        transition={{
          type: 'tween',
        }}
      >
        <HeaderMid />
        <HeaderMobileMid />
        <HeaderBottom />
      </motion.div>
    </header>
  )
}
