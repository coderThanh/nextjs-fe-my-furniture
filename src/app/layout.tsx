import '@/styles/index.scss'

import classNames from 'classnames'

import Layout from '@/components-root/layout'

import WrapProvider from '@/redux/provider'

import { Barlow_Condensed, Josefin_Sans, Open_Sans } from 'next/font/google'

export const barlowCondensed = Barlow_Condensed({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese'],
})

export const opentSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
})

export const josenfinSans = Josefin_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="vi" dir="">
      <body className={classNames(barlowCondensed.className)}>
        <WrapProvider>
          <Layout>{children}</Layout>
        </WrapProvider>
      </body>
    </html>
  )
}
