import classNames from 'classnames'
import React, { LegacyRef, ReactNode, useEffect, useRef, useState } from 'react'
import { motion, Variants } from 'framer-motion'

import styles from './header-menu-dropdown.module.scss'
import AppConst from '@/models/const'

export default function HeaderMenuDropDown(props) {
  const relWrap = useRef(null) // nho them null

  const [isOpen, setIsOpen] = useState(false)

  const [offsetLeftWrap, setOffsetLeftWrap] = useState()

  /**
   * Cần phải xử lý lại phần header / main click
   * and auto closed popup
   */

  // Get offset on init
  useEffect(() => {
    getPostionX()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get offset when resize . Condition width > 768px
  useEffect(() => {
    window.addEventListener('resize', getPostionX)

    // Didmount
    return () => {
      window.removeEventListener('resize', getPostionX)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onClickTitle(isNextStatus) {
    props.onClick != null && props.onClick(isNextStatus)
    setIsOpen(isNextStatus)
  }

  function getPostionX() {
    if (!props.isSubFullWidth) {
      return
    }

    const wrapX = relWrap.current?.getBoundingClientRect().x

    if (wrapX && wrapX != offsetLeftWrap) {
      setOffsetLeftWrap(wrapX)
    }
  }

  const childrenVariant = {
    open: {
      transform: 'translateY(0px)',
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'all',
    },
    closed: {
      transform: 'translateY(10px)',
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  }

  return (
    <>
      <div
        ref={relWrap}
        className={classNames(
          styles.wrap,
          props.classWrap,
          isOpen ? styles.active : '',
        )}
        onMouseEnter={(event) => props.isShowHover && onClickTitle(true)}
        onMouseLeave={(event) => props.isShowHover && onClickTitle(false)}
      >
        <div
          onClick={(event) => onClickTitle(!isOpen)}
          className={classNames(styles.title, 'dropdown-title')}
        >
          {props.title}
        </div>
        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          variants={childrenVariant}
          className={classNames(
            styles.sub,
            props.classChildren,
            props.isSubFullWidth ? styles.subFull : '',
            'sub-menu',
          )}
          transition={{
            duration: AppConst.duration1,
            opacity: {
              duration: isOpen ? 0.1 : 0.05,
            },
          }}
          style={{
            left: offsetLeftWrap && -1 * offsetLeftWrap,
          }}
        >
          {props.children}
        </motion.div>
      </div>
    </>
  )
}
