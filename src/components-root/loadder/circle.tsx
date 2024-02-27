'use client'

import classNames from 'classnames'
import styles from './styles.module.scss'
export default function LoaderCirle() {
  return (
    <>
      <span className={classNames(styles.loaderCircle)}></span>
    </>
  )
}
