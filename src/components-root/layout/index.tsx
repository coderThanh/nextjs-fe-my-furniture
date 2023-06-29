import styles from "./layout.module.scss";
import classNames from "classnames";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type LayoutProps = {
  children?: ReactNode;
  aside?: ReactNode;
  type: LayoutType;

  header?: ReactNode;
  footer?: ReactNode;
  asideType: LayoutAsideType;
  classMain?: string;
};

export enum LayoutType {
  container = "container",
  containerFluid = "container-fluid",
  full = "full",
}

export enum LayoutAsideType {
  leftFix = "leftFix",
  no = "no",
}

export default function Layout(props: LayoutProps) {
  // Redux
  const isAsideLeftOpen = useSelector(
    (state: RootState) => state.aside.isLeftOpen
  );

  return (
    <>
      <main id="main" className={classNames(styles.main, props.classMain)}>
        {props.header}
        {props.asideType == LayoutAsideType.leftFix && props.aside}
        <div
          className={classNames(
            styles.layoutWrap,
            props.asideType == LayoutAsideType.leftFix
              ? styles.hasAsideLefFix
              : "",
            !isAsideLeftOpen ? styles.asideLeftClose : "",
            "layout-wrap"
          )}
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
        {props.footer}
      </main>
    </>
  );
}
