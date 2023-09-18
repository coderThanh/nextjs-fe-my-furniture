import Layout from '@/components-root/layout'

import Gap from '@/components-root/gap'

import SEO from '@/components-root/seo'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { parseSEO } from '@/helpers/parseGQL'
import {
  UseFallbackHomeBlogBy,
  UseFallbackHomeHotBanner,
  UseFallbackHomeHotBlog,
  UseHomeSEO,
} from '@/hooks'
import Footer from '@/ui/footer'
import { HomeBlogsBy } from '@/ui/page-home/home-category-style-blog'
import { HomePostByCategoryDemo } from '@/ui/page-home/home-demo-category-blog'
import { HomeHotBlogDemo } from '@/ui/page-home/home-demo-hot-blog'
import { HomeHotBlog } from '@/ui/page-home/home-hot-blog'
import Header from '../ui/header'

export default function Home({ fallback, seo }) {
  const isConnectAPI = process.env.NEXT_PUBLIC_HAS_API_DB_CONECT

  const parsedSEO = parseSEO(seo?.pageHome?.data?.attributes?.seo)

  return (
    <>
      <SEO pageTitle={parsedSEO.title} description={parsedSEO.description} />

      <WrapSWRConfig value={{ fallback: fallback }}>
        <Layout className="home-page">
          <Header />
          <Gap large={30} small={20} />
          {isConnectAPI && <HomeHotBlog />}
          {isConnectAPI && <HomeBlogsBy />}
          {!isConnectAPI && <HomeHotBlogDemo />}
          {!isConnectAPI && <HomePostByCategoryDemo title="Chuyện nhà" />}
          {!isConnectAPI && <HomePostByCategoryDemo title="Xu hướng" />}
          {!isConnectAPI && <HomePostByCategoryDemo title="Minimalism" />}
          {!isConnectAPI && <HomePostByCategoryDemo title="Zen" />}
          <Gap large={70} medium={50} small={30} />
          <Footer />
        </Layout>
      </WrapSWRConfig>
    </>
  )
}

export async function getServerSideProps() {
  // Check
  if (!process.env.NEXT_PUBLIC_HAS_API_DB_CONECT) {
    return {
      props: {
        fallback: {},
      },
    }
  }

  const resSEO = await UseHomeSEO()
  const fallbackHotBlog = await UseFallbackHomeHotBlog()
  const fallbackHotBanner = await UseFallbackHomeHotBanner()
  const fallbackBlogBy = await UseFallbackHomeBlogBy()

  return {
    props: {
      seo: resSEO,
      fallback: {
        ...fallbackHotBlog,
        ...fallbackHotBanner,
        ...fallbackBlogBy,
      },
    },
  }
}
