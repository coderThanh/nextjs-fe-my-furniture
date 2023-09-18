import classNames from 'classnames'
import styles from './footer.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Footer() {
  const [stHeight, setHeight] = useState(null)
  const refInner = useRef(null)

  // Check resize chagne height
  const setHeightHeader = useCallback(() => {
    const headerHeight = refInner.current?.getBoundingClientRect().height

    headerHeight && setHeight(headerHeight)
  }, [])

  useEffect(() => {
    setHeightHeader()

    window.addEventListener('resize', setHeightHeader)

    return () => {
      window.removeEventListener('resize', setHeightHeader)
    }
  }, [setHeightHeader])

  return (
    <footer
      className={classNames(styles.wrap, 'footer-wrap')}
      style={{
        height: stHeight,
      }}
    >
      <div
        ref={refInner}
        className={classNames('footer-inner')}
        style={
          stHeight
            ? {
                position: 'absolute',
                zIndex: 10,
                bottom: 0,
                left: 0,
                width: '100%',
              }
            : {}
        }
      >
        <div className={classNames('container-fluid', styles.innerWrap)}>
          <div className={classNames(styles.content, 'footer-content')}>
            <p>Copyright 2023 PT Design</p>
          </div>
          <div className={classNames(styles.bg, 'footer-bg')}></div>
        </div>
      </div>
    </footer>
  )
}
