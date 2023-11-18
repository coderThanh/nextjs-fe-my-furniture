import Footer from '@/app/(components)/footer'
import { HomePostByCategoryDemo } from '@/app/(components)/page-home/home-demo-category-blog'
import { HomeHotBlogDemo } from '@/app/(components)/page-home/home-demo-hot-blog'
import Gap from '@/components-root/gap'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { isConnectAPI } from '@/helpers'
import { UseHomeSEO } from '@/hooks/use-home'
import { Metadata, ResolvingMetadata } from 'next'
import Header from './(components)/header'
import { getMetaRobots } from '@/helpers/method'
import { HomeHotBlog } from '@/app/(components)/page-home/home-hot-blog'

// export const metadata: Metadata = {
//   title: TITLE_PAGE,
//   description: DESCRIPTION_PAGE,
//   robots: getMetaRobots(),
// }

export async function generateMetadata(
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await UseHomeSEO()

  console.log(data)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: data?.title,
    description: data?.description,
    openGraph: {
      images: [data?.thumbnail?.url, ...previousImages],
    },
    robots: getMetaRobots(),
  }
}

export default function Home({}) {
  const wasConnectAPI = isConnectAPI()

  return (
    <>
      <WrapSWRConfig>
        <Header />

        <Gap large={30} small={20} />
        {wasConnectAPI && <HomeHotBlog />}
        {/* 
        {wasConnectAPI && <HomeBlogsBy />}
        {wasConnectAPI && <HomeBlogs />}
         */}

        {/* Demo UI  */}
        {!wasConnectAPI && <HomeHotBlogDemo />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Chuyện nhà" />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Xu hướng" />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Minimalism" />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Zen" />}
        <Gap large={70} medium={50} small={30} />
        <Footer />
      </WrapSWRConfig>
    </>
  )
}

// export async function getServerSideProps() {
//   // Check

//   if (!isConnectAPI()) {
//     return {
//       props: {
//         fallback: {},
//       },
//     }
//   }

//   const resSEO = await UseHomeSEO()
//   const fallbackHotBlog = await UseServerHomeHotBlog()
//   const fallbackHotBanner = await UseFallbackHomeHotBanner()
//   const fallbackBlogBy = await UseFallbackHomeBlogBy()
//   const fallbackBlogs = await UseFallbackHomeBlogs()

//   return {
//     props: {
//       seo: resSEO,
//       fallback: {
//         ...fallbackHotBlog,
//         ...fallbackHotBanner,
//         ...fallbackBlogBy,
//         ...fallbackBlogs,
//       },
//     },
//   }
// }
