import UIBreadcrumb from '@/app/(components)/breadcrumb'
import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import BlogHeadArea from '@/app/(post)/(components)/blog-head'
import SingleBlogRelated from '@/app/(post)/(components)/blog-related'
import BlogTagArea from '@/app/(post)/(components)/blog-tag'
import { Content404 } from '@/components-root/404'
import Gap from '@/components-root/gap'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { formatDate, toTitleCase } from '@/helpers'
import { getMetaRobots } from '@/helpers/method'
import {
  UseFetchServerBlogDetail,
  UseFetchServerBlogsRelated,
} from '@/hooks/use-blog'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // hook
  var data = await UseFetchServerBlogDetail(params.slug)

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: data?.title,
    description: data?.expect,
    openGraph: {
      images: [data?.thumbnail?.url, ...previousImages],
    },
    robots: getMetaRobots(),
  }
}

export default async function BlogDetailPage({ params }: Props) {
  // hook
  const blog = await UseFetchServerBlogDetail(params.slug)

  const { title, createdAt, styles, categories, tags, expect, content } =
    blog ?? {}

  const blogsRelated = await UseFetchServerBlogsRelated(blog)

  return (
    <>
      <WrapSWRConfig>
        <Header />
        <UIBreadcrumb name={toTitleCase(title ?? '')} />
        {!blog && <Content404 />}
        {blog && (
          <section className="single-content">
            <div className="section-inner container">
              <div className="row justify-content-center">
                <div className="col col-content col-lg-10">
                  <div className="col-inner">
                    <article className="article-wrap">
                      {/* Header */}
                      <BlogHeadArea
                        title={title}
                        categories={categories}
                        styles={styles}
                        expect={expect}
                        createdAt={formatDate(createdAt ?? Date.now())}
                      />

                      {/* Content */}
                      <div
                        className="article-content"
                        dangerouslySetInnerHTML={{
                          __html: content ?? '',
                        }}
                      />
                    </article>

                    {/* Tags */}
                    {tags?.length > 0 ? (
                      <BlogTagArea data={tags ?? []} />
                    ) : (
                      <></>
                    )}

                    {/* Related */}
                    <SingleBlogRelated data={blogsRelated} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <Gap large={100} />
        <Footer />
      </WrapSWRConfig>
    </>
  )
}
