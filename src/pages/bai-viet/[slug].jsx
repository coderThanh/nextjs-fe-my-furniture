import { Content404 } from '@/components-root/404'
import Gap from '@/components-root/gap'
import Layout from '@/components-root/layout'
import AppLink from '@/components-root/link'
import AppMaterialIcon, {
  AppMaterialIconType,
} from '@/components-root/material-icon'
import SEO from '@/components-root/seo'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { ROUTER_URL } from '@/consts/router'
import { formatDate, isConnectAPI, parseStringTitle } from '@/helpers'
import { UseFallBackBlogDetail, UseFallBackBlogRealted } from '@/hooks'
import UIBreadcrumb from '@/ui/breadcrumb'
import Footer from '@/ui/footer'
import Header from '@/ui/header'
import SingleBlogRelated from '@/ui/single-blog/blog-related'

export default function PostDetailPage({ fallback, blog }) {
  return (
    <>
      <SEO pageTitle={blog?.title ?? ''} description={blog?.expect ?? ''} />
      <WrapSWRConfig value={{ fallback: fallback }}>
        <Layout className="single-page">
          <Header />
          <UIBreadcrumb name={parseStringTitle(blog?.title ?? '')} />
          {!blog && <Content404 />}
          {blog && (
            <section className="single-content">
              <div className="section-inner container">
                <div className="row justify-content-center">
                  <div className="col col-content col-lg-10">
                    <div className="col-inner">
                      <article className="article-wrap">
                        {/* Header */}
                        <div className="article-head">
                          <h1 className="article-title">
                            {parseStringTitle(blog?.title ?? '')}
                          </h1>
                          <div className="article-meta">
                            <span className="article-time article-meta-item">
                              <AppMaterialIcon
                                type={AppMaterialIconType.outlined}
                              >
                                calendar_today
                              </AppMaterialIcon>
                              {formatDate(blog?.createdAt ?? Date.now())}
                            </span>
                            <span className="article-cate article-meta-item">
                              <AppMaterialIcon
                                type={AppMaterialIconType.outlined}
                              >
                                attach_file
                              </AppMaterialIcon>
                              {blog?.categories?.map((item, index) => {
                                return (
                                  <AppLink
                                    url={item?.slug ? item.slug : ''}
                                    key={index}
                                    classLink="cate-item"
                                  >
                                    {index > 0 ? ', ' : ''}
                                    {index == 0
                                      ? parseStringTitle(item?.title) ?? ''
                                      : ''}
                                    {index > 0
                                      ? item?.title.toLocaleLowerCase() ?? ''
                                      : ''}
                                  </AppLink>
                                )
                              })}
                            </span>
                          </div>
                          {blog?.expect?.length > 0 ? (
                            <p className="article-except">{blog.expect}</p>
                          ) : (
                            <></>
                          )}
                        </div>
                        {/* Content */}
                        <div
                          className="article-content"
                          dangerouslySetInnerHTML={{
                            __html: blog?.content ?? '',
                          }}
                        />
                      </article>
                      {/* Tags */}
                      {blog?.tags?.length > 0 ? (
                        <div className="single-tag single-section">
                          <div className="single-tag-title">
                            <span className="me-2 d-inline-block mb-3">
                              Tags:
                            </span>

                            <div className="tags-wrap">
                              {blog?.tags?.map((item, index) => {
                                return (
                                  <AppLink
                                    url={
                                      item?.slug
                                        ? `${ROUTER_URL.blogs}?tagSlug=${item.slug}`
                                        : ''
                                    }
                                    key={index}
                                    classLink="tag-item"
                                  >
                                    {item?.title ?? ''}
                                  </AppLink>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {/* Related */}
                      <SingleBlogRelated blog={blog} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <Gap large={100} />
          <Footer />
        </Layout>
      </WrapSWRConfig>
    </>
  )
}

export const getServerSideProps = async (context) => {
  if (!isConnectAPI()) {
    return {
      props: {},
    }
  }

  const data = await UseFallBackBlogDetail(context.query.slug)

  var fallbackRelated = {}

  if (data?.blog) {
    fallbackRelated = await UseFallBackBlogRealted(
      data?.blog?.categories?.map((item) => item.id) ?? [],
      data?.blog?.styles?.map((item) => item.id) ?? [],
      data?.blog?.id ? [data?.blog?.id] : [],
    )
  }

  return {
    props: {
      blog: data?.blog,
      fallback: { ...data.fallback, ...fallbackRelated },
    },
  }
}
