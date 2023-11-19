import '@/styles/index.scss'

import Layout from '@/components-root/layout'

import WrapProvider from '@/redux/provider'

import { Barlow_Condensed } from 'next/font/google'

const barlowCondensed = Barlow_Condensed({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese'],
})

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
