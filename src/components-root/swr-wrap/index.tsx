'use client'

import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

type Props = {
  value?: any
  children?: ReactNode
}

export default function WrapSWRConfig({ value, children }: Props) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: true,
        ...value,
      }}
    >
      {children}
    </SWRConfig>
  )
}
