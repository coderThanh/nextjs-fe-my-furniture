import React, { ReactElement } from 'react'
import { SWRConfig } from 'swr'

export default function WrapSWRConfig({ value, children }) {
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
