import classNames from 'classnames'
import styles from './footer.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFetchFooterCoypright, useFetchFooterScripts } from '@/hooks'
import Script from 'next/script'

export default function Footer() {
  const [stHeight, setHeight] = useState(null)
  const refInner = useRef(null)

  // Check resize chagne height
  const setHeightHeader = useCallback(() => {
    const headerHeight = refInner.current?.getBoundingClientRect().height

    headerHeight && setHeight(headerHeight)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setHeightHeader)

    return () => {
      window.removeEventListener('resize', setHeightHeader)
    }
  }, [setHeightHeader])

  // fetch
  const { data, isLoading } = useFetchFooterCoypright()

  const { data: dataScripts } = useFetchFooterScripts()

  useEffect(() => {
    setHeightHeader()
  }, [setHeightHeader, isLoading, data])

  return (
    <>
      <footer
        className={classNames(styles.wrap, 'footer-wrap ')}
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
          <div className={classNames('', styles.innerWrap)}>
            <div
              className={classNames(styles.content, 'footer-content container')}
            >
              {!isLoading && data?.length > 0 ? (
                <div dangerouslySetInnerHTML={{ __html: data }} />
              ) : (
                <p>Copyright 2023 Furmi</p>
              )}
            </div>
            <span className={classNames(styles.bg, 'footer-bg')}></span>
          </div>
        </div>
      </footer>
      {dataScripts && (
        <Script
          type="text/javascript"
          id="footer-hook"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: dataScripts }}
        />
      )}
    </>
  )
}
