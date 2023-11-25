import '@/styles/index.scss'

import Layout from '@/components-root/layout'

import WrapProvider from '@/redux/provider'

import { barlowCondensed } from '@/app/fonts'
import { Metadata } from 'next'
import { ReactNode } from 'react'

//
export const dynamic = 'force-dynamic'

//
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN ?? ''),
}

//
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" dir="" className={barlowCondensed.className}>
      <body>
        <WrapProvider>
          <Layout>{children}</Layout>
        </WrapProvider>
      </body>
    </html>
  )
}
