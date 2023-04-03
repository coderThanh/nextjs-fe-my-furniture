import classNames from "classnames";
import AppImage from "../img";

import styles from "./card-blog.module.scss";

export type CardBlogProps = {
  thumbnail: string;
  classCateWrap?: string;
  classImgWrap?: string;
  classTextWrap?: string;
};

export default function CardBlog(props: CardBlogProps): JSX.Element {
  return (
    <>
      <div>
        <div className={classNames(props.classCateWrap, styles.cateWrap)}>
          <AppImage
            src={props.thumbnail}
            ratio={100}
            alt={""}
            radius={100}
            className={classNames(styles.cateThumb)}
          />
          <div className={classNames(styles.cateInfoWrap)}>
            <div className={classNames(styles.cateName)}>Category name</div>
            <div className={classNames(styles.cateSub)}>Contemporary</div>
          </div>
        </div>
        <AppImage
          src={props.thumbnail}
          ratio={100}
          radius={7}
          alt={""}
          className={classNames(props.classImgWrap, styles.imgWrap)}
        />
        <div className={classNames(props.classTextWrap, styles.textWrap)}>
          <div className={classNames(styles.name)}>
            Nhà trong ngõ nhỏ nhưng có đến 4 mặt tiền, không ồn ào và rất sáng
            sủa
          </div>
        </div>
      </div>
    </>
  );
}
