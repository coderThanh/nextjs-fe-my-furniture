import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import { ReactNode } from 'react'

//
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
