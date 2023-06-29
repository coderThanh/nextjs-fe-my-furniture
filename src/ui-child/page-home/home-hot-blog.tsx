import CardBlog, { CardBlogType } from "@/components-child/card-blog";
import AppLink from "@/components-root/link";
import Slider from "@/components-root/slider";
import GraphQLQuery from "@/models/graphql/graphql-query";
import { PageHomeRes } from "@/models/page-home-res";
import SWRKey from "@/models/swr-key";
import classNames from "classnames";
import { ReactNode } from "react";
import useSWR from "swr";
import Image from "next/image";

export function HomeHotBlog(): JSX.Element {
  const { data } = useSWR<PageHomeRes>([
    SWRKey.pageHomeRes,
    GraphQLQuery.getPageHomeData,
    { numbers: 6 },
  ]);

  if (!data?.pageHome.data.attributes) {
    return <></>;
  }

  const hotBlogsData = data.pageHome.data.attributes.hot_blogs.data;
  const hotBanner = data.pageHome.data.attributes.hot_banner;

  return (
    <>
      <div className={classNames("row row-equal", "home-hot-blog")}>
        {hotBlogsData.length > 0 && (
          <div className="col col-sm-12 col-md-9 col-lg-9 ">
            <div className="col-inner">
              <Slider
                lg={1}
                md={1}
                sm={1}
                isShowButton={true}
                count={hotBlogsData.length}
                build={function (index: number): ReactNode {
                  return (
                    <>
                      <CardBlog
                        thumbnail={`/images/blogs/blog_${Math.min(
                          index + 1,
                          6
                        )}.jpg`}
                        imgRatio={55}
                        imgRadius={10}
                        type={CardBlogType.overlay}
                        title={hotBlogsData[index].attributes.title}
                      />
                    </>
                  );
                }}
              />
            </div>
          </div>
        )}
        {hotBanner.data.attributes.url && (
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
        )}
      </div>
    </>
  );
}
