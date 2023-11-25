import '@/styles/index.scss'

import Layout from '@/components-root/layout'

import WrapProvider from '@/redux/provider'

import { barlowCondensed } from '@/app/fonts'
import { Metadata } from 'next'

//
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

//
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN ?? ''),
}

//
export default function RootLayout({ children }) {
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
