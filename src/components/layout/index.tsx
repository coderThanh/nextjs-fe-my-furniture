import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import Aside from "../aside";

import styles from "./layout.module.scss";
import classNames from "classnames";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MouseEvent } from "react";
import { clickMain } from "@/redux/features/root_click/slice";
import { debounce } from "@/controllers/debounce";

type LayoutProps = {
  children?: ReactNode;
  type: LayoutType;
  headerType: LayoutHeaderType;
  footerType: LayoutFooterType;
  asideType: LayoutAsideType;
  classMain?: string;
};

export enum LayoutType {
  container = "container",
  containerFluid = "container-fluid",
  full = "full",
}

export enum LayoutHeaderType {
  default = "default",
  no = "no",
}

export enum LayoutFooterType {
  default = "default",
  no = "no",
}

export enum LayoutAsideType {
  left = "left",
  leftFix = "leftFix",
  right = "right",
  no = "no",
}

export default function Layout(props: LayoutProps) {
  // Redux
  const isAsideLeftOpen = useSelector(
    (state: RootState) => state.aside.isLeftOpen
  );

  const dispatch = useDispatch();

  // interior

  const debouncer = debounce(() => {
    dispatch(clickMain());
  }, 220);

  function mainOnClick(event: MouseEvent<HTMLElement>): void {
    debouncer();
  }

  return (
    <>
      <main id="main" className={classNames(styles.main, props.classMain)}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        {props.headerType == LayoutHeaderType.default && <Header />}
        {props.asideType == LayoutAsideType.leftFix && <Aside />}
        <div
          className={classNames(
            styles.layoutWrap,
            props.headerType == LayoutHeaderType.default
              ? styles.hasHeader
              : "",
            props.asideType == LayoutAsideType.leftFix
              ? styles.hasAsideLefFix
              : "",
            !isAsideLeftOpen ? styles.asideLeftClose : "",
            "layout-wrap"
          )}
          onClick={(event) => mainOnClick(event)}
        >
          <div
            className={classNames(
              { "container-fluid": props.type == LayoutType.containerFluid },
              props.type == LayoutType.container ? "container-lg" : "",
              styles.inner,
              "layout-inner"
            )}
          >
            {props.children}
          </div>

          <div className={classNames(styles.bg, "layout-bg")}></div>
        </div>
        {props.footerType == LayoutFooterType.default && <Footer />}
      </main>
    </>
  );
}
