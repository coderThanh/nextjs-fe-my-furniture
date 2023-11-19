import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import { Content404 } from '@/components-root/404'
import Layout from '@/components-root/layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 | Nội dung không tìm thấy',
  description: 'Trang bạn tìm kiếm không có kết quả',
}

export default function PageNotFound() {
  return (
    <>
      <Layout>
        <Header />
        <Content404 />
        <Footer />
      </Layout>
    </>
  )
}
