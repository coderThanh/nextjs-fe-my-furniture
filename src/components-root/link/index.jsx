import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'

export default function AppLink(props) {
  const timeDrag = useRef(0)
  const linkRef = useRef(null)
  const router = useRouter()

  const handleTouchStart = useCallback((event) => {
    event.preventDefault()
    timeDrag.current = Date.now()
  }, [])

  const handleTouchEnd = useCallback(
    (event) => {
      event.preventDefault()

      if (Date.now() - timeDrag.current < 160 && window != undefined) {
        router.push(props.url)
      }
    },
    [props.url, router],
  )

  // Detect drag in case slider
  useEffect(() => {
    const element = linkRef.current

    element?.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })
    element?.addEventListener('mousedown', handleTouchStart, {
      passive: false,
    })
    element?.addEventListener('touchend', handleTouchEnd, {
      passive: false,
    })
    element?.addEventListener('mouseup', handleTouchEnd, {
      passive: false,
    })

    return () => {
      element?.removeEventListener('touchstart', handleTouchStart)
      element?.removeEventListener('touchend', handleTouchEnd)
      element?.removeEventListener('mousedown', handleTouchEnd)
      element?.removeEventListener('mouseup', handleTouchStart)
    }
  }, [handleTouchEnd, handleTouchStart])

  return (
    <>
      {props.url && (
        <Link
          ref={linkRef}
          href={props.url}
          className={props.classLink}
          target={props.target}
          rel={props.rel}
          onClick={(e) => e.preventDefault()}
        >
          {props.children}
        </Link>
      )}
      {!props.url && <div className={props.classLink}>{props.children}</div>}
    </>
  )
}
