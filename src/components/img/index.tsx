import AppConst from "@/models/const";
import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

import styles from "./img.module.scss";

type ImgPropsType = ImageProps & {
  ratio?: number;
  width?: number;
  height?: number;
  radius?: number;
  overlayCover?: string;
  className?: string;
  src: string;
  alt?: string;
  style?: CSSProperties;
  styleImg?: CSSProperties;
  priority?: boolean;
  sizes?: string;
};

export default function AppImage(props: ImgPropsType) {
  return (
    <div
      className={classNames(
        "imgWrap",
        props.className,
        props.ratio ? styles.ratio : "",
        styles.wrap
      )}
      style={{
        ...props.style,
      }}
    >
      <div
        className={classNames(styles.imgInner, "img-inner")}
        style={{
          paddingTop: props.ratio ? `${props.ratio}%` : undefined,
          borderRadius: props.radius,
        }}
      >
        <Image
          src={props.src}
          alt={props.alt && AppConst.titleDefault}
          fill={props.ratio ? true : false}
          width={props.ratio ? undefined : props.width}
          height={props.ratio ? undefined : props.height}
          style={{ ...props.styleImg }}
          priority={props.priority}
          sizes={props.ratio ? props.sizes ?? "100%" : undefined}
          className={classNames(styles.img)}
        />
        <div
          className={classNames(styles.imgOverlay)}
          style={{
            backgroundColor: props.overlayCover,
          }}
        ></div>
      </div>
    </div>
  );
}
