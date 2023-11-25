'use client'

import { useFooterScripts } from '@/services/hooks/hookTheme'
import classNames from 'classnames'
import Script from 'next/script'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import styles from './footer.module.scss'

type Props = {
  children?: ReactNode
}

export default function FooterWrap({ children }: Props) {
  const [stHeight, setHeight] = useState<any>(null)
  const refInner = useRef<any>(null)

  // Check resize chagne height
  const setHeightHeader = useCallback(() => {
    const headerHeight = refInner.current?.getBoundingClientRect().height

    headerHeight && setHeight(headerHeight)
  }, [])

  //
  useEffect(() => {
    // first time
    setHeightHeader()

    window.addEventListener('resize', setHeightHeader)

    return () => {
      window.removeEventListener('resize', setHeightHeader)
    }
  }, [setHeightHeader])

  // fetch

  const { data: dataScripts } = useFooterScripts()

  return (
    <>
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
          {children}
        </div>
      </footer>

      {/* Script Footer */}
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
