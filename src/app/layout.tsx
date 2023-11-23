import '@/styles/index.scss'

import Layout from '@/components-root/layout'

import WrapProvider from '@/redux/provider'

import { Barlow_Condensed } from 'next/font/google'
import { Metadata } from 'next'

const barlowCondensed = Barlow_Condensed({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN),
}

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
