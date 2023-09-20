import Layout from '@/components-root/layout'
import SEO from '@/components-root/seo'
import BodySearchBlogs from '@/ui/archive-blog/search-body-loop'
import UIBreadcrumb from '@/ui/breadcrumb'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import { useRouter } from 'next/router'

export default function SearchPage() {
  return (
    <>
      <SEO pageTitle={'Tìm kiếm bài viết'} />

      <Layout className="search-page">
        <Header />
        <UIBreadcrumb name={'Tìm kiếm'} />

        <BodySearchBlogs />

        <Footer />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
