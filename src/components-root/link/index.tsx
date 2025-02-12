import { Route } from 'next'
import Link from 'next/link'
import { CSSProperties, HTMLAttributeAnchorTarget, ReactNode } from 'react'

type Props = {
  url?: Route | null
  className?: string
  target?: HTMLAttributeAnchorTarget
  rel?: string
  children?: ReactNode
  title?: string
  style?: CSSProperties
}
export default function AppLink({
  url,
  className,
  target,
  rel,
  children,
  title,
  style,
  ...args
}: Props) {
  return (
    <>
      {url && (
        <Link
          className={className}
          href={url}
          rel={rel}
          style={style}
          target={target}
          title={title}
          {...args}
        >
          {children}
        </Link>
      )}
      {!url && (
        <div className={className} style={style}>
          {children}
        </div>
      )}
    </>
  )
}
