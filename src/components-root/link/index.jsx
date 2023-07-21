import Link from 'next/link'
import { ReactNode, useRef } from 'react'
import { Url } from 'url'

export default function AppLink(props) {
  return (
    <>
      {props.url && (
        <Link
          href={props.url}
          className={props.classLink}
          target={props.target}
          rel={props.rel}
        >
          {props.children}
        </Link>
      )}
      {!props.url && <div className={props.classLink}>{props.children}</div>}
    </>
  )
}
