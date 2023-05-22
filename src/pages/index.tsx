import Head from "next/head";
import Layout, {
  LayoutAsideType,
  LayoutFooterType,
  LayoutHeaderType,
  LayoutType,
} from "@/components/layout";

import Gap from "@/components/gap";

import Slider from "@/components/slider";
import AppImage from "@/components/img";
import AppAssets from "@/models/assets";
import { ReactNode } from "react";
import CardBlog, { CardBlogType } from "@/components/card-blog";
import classNames from "classnames";

import Image from "next/image";
import AppLink from "@/components/link";
import AppConst from "@/models/const";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Layout
        type={LayoutType.container}
        headerType={LayoutHeaderType.default}
        footerType={LayoutFooterType.default}
        asideType={LayoutAsideType.no}
        classMain="home-page"
      >
        <Gap large={30} small={20} />
        <HomeHotBlog />
        <Gap large={50} small={30} />
        <HomePostByCategory title={"Chuyện nhà"} />
        <Gap large={70} medium={50} small={30} />
        <HomePostByCategory title={"Kho ảnh"} />
        <Gap large={70} medium={50} small={30} />
        <HomePostByCategory title={"Bài viết mới"} />
        <Gap large={70} medium={50} small={30} />
      </Layout>
    </>
  );
}

export function HomeHotBlog(): JSX.Element {
  return (
    <>
      <div className={classNames("row row-equal", "home-hot-blog")}>
        <div className="col col-sm-12 col-md-9 col-lg-9 ">
          <div className="col-inner">
            <Slider
              lg={1}
              md={1}
              sm={1}
              isShowButton={true}
              count={4}
              build={function (index: number): ReactNode {
                return (
                  <>
                    <CardBlog
                      thumbnail={`/images/blogs/blog_${index + 1}.jpg`}
                      imgRatio={55}
                      imgRadius={10}
                      type={CardBlogType.overlay}
                    />
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className={classNames("col col-12 col-md-3 d-none d-md-block")}>
          <div
            className="col-inner"
            style={{
              position: "relative",
            }}
          >
            <AppLink>
              <Image
                src={"/images/banner/banner_1.jpg"}
                fill={true}
                sizes="100%"
                alt={""}
                priority={true}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            </AppLink>
          </div>
        </div>
      </div>
    </>
  );
}

export type HomePostByCategoryProps = {
  title: string;
};

export function HomePostByCategory(
  props: HomePostByCategoryProps
): JSX.Element {
  return (
    <>
      <section className="home-posts">
        <div className="row ">
          <div className="col">
            <div className="col-inner">
              <div className={classNames("title_default")}>
                <h3>{props.title}</h3>
                <AppLink classLink="title-more" url={"/category"}>
                  Xem tất cả
                </AppLink>
              </div>
            </div>
          </div>
        </div>
        <div className="post-wrap row row-mt row-large">
          {Array(6)
            .fill(null)
            .map((item, index: number) => {
              return (
                <div className="col col-12 col-sm-6 col-md-4" key={index}>
                  <div className="col-inner">
                    <CardBlog
                      thumbnail={`/images/blogs/blog_${index + 1}.jpg`}
                      imgRatio={56.2}
                      imgRadius={10}
                      type={CardBlogType.default}
                      isShowCate={true}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
