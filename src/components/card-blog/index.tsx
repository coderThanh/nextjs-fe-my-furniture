import classNames from "classnames";
import AppImage from "../img";

import styles from "./card-blog.module.scss";

export type CardBlogProps = {
  thumbnail: string;
  type?: CardBlogType;
  imgRatio?: number;
  imgRadius?: number;
  isShowCate?: boolean;
  classBoxWrap?: string;
  classCateWrap?: string;
  classImgWrap?: string;
  classTextWrap?: string;
};

export enum CardBlogType {
  default = "default",
  overlay = "overlay",
}

export default function CardBlog(props: CardBlogProps): JSX.Element {
  return (
    <>
      <div
        className={classNames(
          "blog-box",
          props.type,
          props.type == CardBlogType.overlay ? styles.overlay : "",
          styles.box,
          props.classBoxWrap
        )}
      >
        {props.isShowCate && (
          <div
            className={classNames(
              props.classCateWrap,
              "blog-cate-wrap",
              styles.cateWrap
            )}
          >
            <AppImage
              src={props.thumbnail}
              ratio={100}
              alt={""}
              radius={100}
              className={classNames(styles.cateThumb, "blog-cate-img")}
            />
            <div className={classNames(styles.cateInfoWrap)}>
              <div className={classNames(styles.cateName)}>Category name</div>
              <div className={classNames(styles.cateSub)}>Contemporary</div>
            </div>
          </div>
        )}
        <AppImage
          src={props.thumbnail}
          ratio={props.imgRatio || 100}
          radius={props.imgRadius}
          alt={""}
          className={classNames(props.classImgWrap, styles.imgWrap, "box-img")}
        />
        <div
          className={classNames(
            props.classTextWrap,
            styles.textWrap,
            "box-text"
          )}
          style={{
            borderRadius:
              props.type == CardBlogType.overlay ? props.imgRadius : undefined,
          }}
        >
          <div className={classNames(styles.name, "name")}>
            Nhà trong ngõ nhỏ nhưng có đến 4 mặt tiền, không ồn ào và rất sáng
            sủa
          </div>
        </div>
      </div>
    </>
  );
}
