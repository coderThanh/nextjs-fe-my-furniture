import Link from 'next/link'
import { HTMLAttributeAnchorTarget, ReactNode } from 'react'

type Props = {
  url?: string
  className?: string
  target?: HTMLAttributeAnchorTarget
  rel?: string
  children?: ReactNode
  title?: string
}
export default function AppLink({
  url,
  className,
  target,
  rel,
  children,
  title,
  ...args
}: Props) {
  return (
    <>
      {url && (
        <Link
          title={title}
          className={className}
          href={url}
          target={target}
          rel={rel}
          {...args}
        >
          {children}
        </Link>
      )}
      {!url && <div className={className}>{children}</div>}
    </>
  )
}
