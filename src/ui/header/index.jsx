import classNames from 'classnames'

import { useHeaderSticky } from '@/hooks'
import { motion } from 'framer-motion'
import HeaderBottom from './header-bottom'
import HeaderMid from './header-mid'
import HeaderMobileMid from './header-mobile-mid'

// Define class tag
export const classMenuItem = 'menu-item'
export const classMenuLink = 'menu-link'
export const classMenuIcon = 'menu-icon'
export const classMenuSub = 'menu-sub'
export const classMenuSubFull = 'menu-sub_full'
export const classNav = 'nav'
export const classNavInner = 'nav-inner'
export const classHasChildren = 'has-children'
export const classChildrenLink = 'children-link'
export const classFull = 'full'

export default function Header() {
  // hook
  const { headerRef, stIsSticky, headerHeight } = useHeaderSticky()

  // Animation variabnle
  const variants = {
    sticking: { y: [-100, 0] },
    normal: { y: '' },
  }

  return (
    <header
      className={classNames('header-wrap', { sticky: stIsSticky })}
      style={{
        height: stIsSticky ? headerHeight : undefined,
      }}
    >
      <motion.div
        ref={headerRef}
        className={classNames('header-inner ')}
        animate={stIsSticky ? 'sticking' : 'normal'}
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
