import Layout from '@/components-root/layout'

import { Content404 } from '@/components-root/404'
import SEO from '@/components-root/seo'
import Footer from '@/ui/footer'
import Header from '../ui/header'

export default function PageNotFound() {
  return (
    <>
      <SEO pageTitle={'404 Nội dung không tìm thấy'} isNofollow={true} />
      <Layout className="home-page">
        <Header />
        <Content404 />
        <Footer />
      </Layout>
    </>
  )
}
