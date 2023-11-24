'use client'

import AppLink from '@/components-root/link'
import { isCurrentUrl } from '@/helpers'
import classNames from 'classnames'
import { Route } from 'next'
import { usePathname } from 'next/navigation'

type Props = {
  url?: Route
  target?: string
  rel?: string
  title?: string
}

export default function MenuItem({ url, target, rel, title }: Props) {
  const pathName = usePathname()

  return (
    <>
      <div
        className={classNames('menu-item', {
          current: isCurrentUrl(url, pathName),
        })}
      >
        <AppLink
          url={url}
          className={'menu-link'}
          target={target ? '_' + target : ''}
          rel={rel}
        >
          {title}
        </AppLink>
      </div>
    </>
  )
}
