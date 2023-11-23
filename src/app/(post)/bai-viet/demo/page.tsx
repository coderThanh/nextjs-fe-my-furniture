/* eslint-disable @next/next/no-img-element */
import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import BlogHeadArea from '@/app/(post)/(components)/blog-head'
import BlogTagArea from '@/app/(post)/(components)/blog-tag'
import CardBlog, { CardBlogType } from '@/components-child/card-blog'
import Gap from '@/components-root/gap'
import { formatDate } from '@/helpers'
import UIBreadcrumb from '@/app/(components)/breadcrumb'

export default function PostDetailPage() {
  const title =
    ' Nhà trong ngõ nhỏ nhưng có đến 4 mặt tiền, không ồn ào và rất sáng sủa'

  const expect = ` Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante.
                      Aenean ultricies mi vitae est. Mauris placerat eleifend
                      leo. Quisque sit amet est et sapien ullamcorper pharetra.
                      Vestibulum erat wisi, condimentum sed, commodo vitae,`
  const content = `<h2>What is Lorem Ipsum?</h2>
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante.
                      Donec eu libero sit amet quam egestas semper. Aenean
                      ultricies mi vitae est. Mauris placerat eleifend leo.
                      Quisque sit amet est et sapien ullamcorper pharetra.
                      Vestibulum erat wisi, condimentum sed, commodo vitae,
                      ornare sit{' '}
                      <a href="">
                        Donec eu libero sit amet quam egestas semper.
                      </a>{' '}
                      amet, wisi. Aenean fermentum, elit eget tincidunt
                      condimentum, eros ipsum rutrum orci, sagittis tempus lacus
                      enim ac dui. Donec non enim in turpis pulvinar facilisis.
                      Ut felis. Praesent dapibus, neque id cursus faucibus,
                      tortor neque egestas augue, eu vulputate magna eros eu
                      erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                      accumsan porttitor, facilisis luctus, metus
                    </p>
                    <img
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1258&q=80"
                      alt="img name"
                    />
                    <dl>
                      <dt>Definition list</dt>
                      <dd>
                        Consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                      </dd>
                      <dt>Lorem ipsum dolor sit amet</dt>
                      <dd>
                        Consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat.
                      </dd>
                    </dl>
                    <ol>
                      <li>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit.
                      </li>
                      <li>Aliquam tincidunt mauris eu risus.</li>
                      <li>Vestibulum auctor dapibus neque.</li>
                    </ol>
                    <h3>What is Lorem Ipsum?</h3>
                    <img
                      src="https://plus.unsplash.com/premium_photo-1673548917385-414efe200403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                      alt="img name"
                    />
                    <figcaption>Aliquam tincidunt mauris eu risus.</figcaption>
                    <img
                      src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="img name"
                    />
                    <figcaption>Aliquam tincidunt mauris eu risus.</figcaption>
                    <img
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1258&q=80"
                      alt="img name"
                    />
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante.
                      Donec eu libero sit amet quam egestas semper. Aenean
                      ultricies mi vitae est. Mauris placerat eleifend leo.
                    </p>
                    <ul>
                      <li>
                        Morbi in sem quis dui placerat ornare. Pellentesque odio
                        nisi, euismod in, pharetra a, ultricies in, diam. Sed
                        arcu. Cras consequat.
                      </li>
                      <li>
                        Praesent dapibus, neque id cursus faucibus, tortor neque
                        egestas augue, eu vulputate magna eros eu erat. Aliquam
                        erat volutpat. Nam dui mi, tincidunt quis, accumsan
                        porttitor, facilisis luctus, metus.
                      </li>
                      <li>
                        Phasellus ultrices nulla quis nibh. Quisque a lectus.
                        Donec consectetuer ligula vulputate sem tristique
                        cursus. Nam nulla quam, gravida non, commodo a, sodales
                        sit amet, nisi.
                      </li>
                      <li>
                        Pellentesque fermentum dolor. Aliquam quam lectus,
                        facilisis auctor, ultrices ut, elementum vulputate,
                        nunc.
                      </li>
                    </ul>{' '}
                    <h4>What is Lorem Ipsum?</h4>
                    <img
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1258&q=80"
                      alt="img name"
                    />
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante.
                      Donec eu libero sit amet quam egestas semper. Aenean
                      ultricies mi vitae est. Mauris placerat eleifend leo.
                      Quisque sit amet est et sapien ullamcorper pharetra.
                      Vestibulum erat wisi, condimentum sed, commodo vitae,
                      ornare sit amet, wisi. Aenean fermentum, elit eget
                      tincidunt condimentum, eros ipsum rutrum orci, sagittis
                      tempus lacus enim ac dui. Donec non enim in turpis
                      pulvinar facilisis. Ut felis. Praesent dapibus, neque id
                      cursus faucibus, tortor neque egestas augue, eu vulputate
                      magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                      tincidunt quis, accumsan porttitor, facilisis luctus,
                      metus
                    </p>{' '}
                    <h5>What is Lorem Ipsum?</h5>
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante.
                      Donec eu libero sit amet quam egestas semper. Aenean
                      ultricies mi vitae est. Mauris placerat eleifend leo.
                      Quisque sit amet est et sapien ullamcorper pharetra.
                      Vestibulum erat wisi, condimentum sed, commodo vitae,
                      ornare sit amet, wisi. Aenean fermentum, elit eget
                      tincidunt condimentum, eros ipsum rutrum orci, sagittis
                      tempus lacus enim ac dui. Donec non enim in turpis
                      pulvinar facilisis. Ut felis. Praesent dapibus, neque id
                      cursus faucibus, tortor neque egestas augue, eu vulputate
                      magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                      tincidunt quis, accumsan porttitor, facilisis luctus,
                      metus
                    </p>
                    <nav>
                      <ul>
                        <li>
                          <a href="#">Home</a>
                        </li>
                        <li>
                          <a href="#">About</a>
                        </li>
                        <li>
                          <a href="#">Clients</a>
                        </li>
                        <li>
                          <a href="#">Contact Us</a>
                        </li>
                      </ul>
                    </nav>
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante.
                      Donec eu libero sit amet quam egestas semper. Aenean
                      ultricies mi vitae est. Mauris placerat eleifend leo.
                      Quisque sit amet est et sapien ullamcorper pharetra.
                      Vestibulum erat wisi, condimentum sed, commodo vitae,
                      ornare sit amet, wisi. Aenean fermentum, elit eget
                      tincidunt condimentum, eros ipsum rutrum orci, sagittis
                      tempus lacus enim ac dui. Donec non enim in turpis
                      pulvinar facilisis. Ut felis. Praesent dapibus, neque id
                      cursus faucibus, tortor neque egestas augue, eu vulputate
                      magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                      tincidunt quis, accumsan porttitor, facilisis luctus,
                      metus
                    </p>
                    <table>
                      <thead>
                        <tr>
                          <th>SD</th>
                          <th>DS</th>
                          <th>DS</th>
                          <th>DS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            condimentum, eros ipsum rutru condimentum, eros
                            ipsum rutru
                          </td>
                          <td>condimentum, eros ipsum rutru condimentum</td>
                          <td>condimentum condimentum, eros ipsum rutru</td>
                          <td>
                            condimentum, eros ipsum rutru condimentum, eros
                            ipsum rutru
                          </td>
                        </tr>
                        <tr>
                          <td>
                            condimentum, eros ipsum rutru condimentum, eros
                            ipsum rutru
                          </td>
                          <td>condimentum, eros ipsum rutru</td>
                          <td>condimentum, eros ipsum rutru</td>
                          <td>
                            condimentum, eros ipsum rutru condimentum, eros
                            ipsum rutru
                          </td>
                        </tr>
                        <tr>
                          <td>
                            condimentum, eros ipsum rutru condimentum, eros
                            ipsum rutru
                          </td>
                          <td>condimentum, eros ipsum rutru rutru</td>
                          <td>rutru condimentum, eros ipsum rutru</td>
                          <td>
                            condimentum, eros ipsum rutru condimentum, eros
                            ipsum rutru
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante.
                      Donec eu libero sit amet quam egestas semper. Aenean
                      ultricies mi vitae est. Mauris placerat eleifend leo.
                      Quisque sit amet est et sapien ullamcorper pharetra.
                      Vestibulum erat wisi, condimentum sed, commodo vitae,
                      ornare sit amet, wisi. Aenean fermentum, elit eget
                      tincidunt condimentum, eros ipsum rutrum orci, sagittis
                      tempus lacus enim ac dui. Donec non enim in turpis
                      pulvinar facilisis. Ut felis. Praesent dapibus, neque id
                      cursus faucibus, tortor neque egestas augue, eu vulputate
                      magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                      tincidunt quis, accumsan porttitor, facilisis luctus,
                      metus
                    </p>`

  const categories = [{ title: 'Category title', slug: '#' }]

  const styles = [{ title: 'Style title', slug: '#' }]

  const tags = [
    { title: 'Tag title', slug: '#' },
    { title: 'Tag 1', slug: '#' },
    { title: 'Tag 2', slug: '#' },
  ]

  return (
    <>
      <Header />
      <UIBreadcrumb name="Nhà trong ngõ nhỏ nhưng có đến 4 mặt tiền, không ồn ào và rất sáng sủa" />
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
                    createdAt={formatDate(Date.now())}
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
                {tags?.length > 0 ? <BlogTagArea data={tags ?? []} /> : <></>}

                {/* Related */}
                <div className="single-relate single-section">
                  <div className="single-relate-title single-section-title">
                    Bài viết liên quan
                  </div>
                  <div className="single-relate-content single-section-content">
                    {Array(6)
                      .fill(null)
                      .map((item, index) => {
                        return (
                          <CardBlog
                            key={index}
                            thumbnail={`/images/blogs/blog_${index + 1}.jpg`}
                            imgRatio={56.2}
                            imgRadius={7}
                            type={CardBlogType.vertical}
                            isShowDate={true}
                            date={formatDate(Date.now())}
                            title="Giảm vật liệu công nghiệp, tăng chất liệu tự nhiên - cách KTS thay đổi không gian sống cho gia chủ"
                            cateTitle="Category name"
                            styleTitle="Style name"
                          />
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Gap large={100} />
      <Footer />
    </>
  )
}
