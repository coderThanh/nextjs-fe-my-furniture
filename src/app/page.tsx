import WrapSWRConfig from '@/components-root/swr-wrap'
import { isConnectAPI } from '@/helpers'
import { Metadata, ResolvingMetadata } from 'next'
import Header from './(components)/header'
import HeaderBottom from '@/app/(components)/header/header-bottom'

// export const metadata: Metadata = {
//   title: TITLE_PAGE,
//   description: DESCRIPTION_PAGE,
//   robots: getMetaRobots(),
// }

export async function generateMetadata(
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // const parsedSEO = parseSEO(seo?.pageHome?.data?.attributes?.seo)
  // read route params
  // const id = params.id

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    // title: product.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default function Home({}) {
  const wasConnectAPI = isConnectAPI()

  return (
    <>
      <WrapSWRConfig>
        <Header />
        {/* 
        <Gap large={30} small={20} />
        {wasConnectAPI && <HomeHotBlog />}
        {wasConnectAPI && <HomeBlogsBy />}
        {wasConnectAPI && <HomeBlogs />}
        {!wasConnectAPI && <HomeHotBlogDemo />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Chuyện nhà" />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Xu hướng" />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Minimalism" />}
        {!wasConnectAPI && <HomePostByCategoryDemo title="Zen" />}
        <Gap large={70} medium={50} small={30} />
        <Footer /> */}
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
//   const fallbackHotBlog = await UseFallbackHomeHotBlog()
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
