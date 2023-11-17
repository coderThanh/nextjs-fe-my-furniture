'use client'

import { useHeaderSticky } from '@/hooks/use-header-sticky'
import classNames from 'classnames'

import { motion } from 'framer-motion'

import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}
export default function HeaderWrap({ children }: Props) {
  // hook
  const { headerRef, stIsSticky, headerHeight } = useHeaderSticky()

  // Animation variabnle
  const variants = {
    sticking: { y: [-100, 0] },
    normal: { y: '' },
  }

  return (
    <>
      <header
        className={classNames('header-wrap', { sticky: stIsSticky })}
        style={{
          height: stIsSticky ? headerHeight : undefined,
          // height: headerHeight,
        }}
      >
        <motion.div
          ref={headerRef}
          className={classNames('header-inner ')}
          animate={stIsSticky ? 'sticking' : 'normal'}
          variants={variants}
          transition={{
            type: 'tween',
            duration: 0,
          }}
        >
          {children}
        </motion.div>
      </header>
    </>
  )
}
