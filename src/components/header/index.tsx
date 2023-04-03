import classNames from "classnames";

import styles from "./header.module.scss";
import {
  MouseEvent,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDispatch } from "react-redux";
import { debounce } from "@/controllers/debounce";
import { clickHeader } from "@/redux/features/root_click/slice";
import {
  easeIn,
  easeInOut,
  motion,
  Target,
  useMotionValueEvent,
  useScroll,
  Variant,
  Variants,
} from "framer-motion";

import HeaderMid from "./header-mid";
import AppLink from "../link";
import HeaderBottom from "./header-bottom";
import { latest } from "immer/dist/internal";

export default function Header() {
  const dispatch = useDispatch();

  // To change global state onClick on main / header / body
  const headerDebouncer = debounce(() => {
    dispatch(clickHeader());
  }, 220);

  // Windown scroll to sticky
  const headerRef = useRef<HTMLDivElement>(null);

  const [isSticky, setSticky] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    windowResize();

    window.addEventListener("resize", windowResize);
    // component didmount
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, [headerHeight]);

  // useEffect(() => {
  //   window.addEventListener("scroll", windownScroll);

  //   // component didmount
  //   return () => {
  //     window.removeEventListener("scroll", windownScroll);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSticky]);

  // method
  function onClick(event: MouseEvent<HTMLElement>) {
    headerDebouncer();
  }

  const windownScroll = useCallback(
    (event: Event) => {
      const windowY: number | undefined = window.scrollY;

      if (windowY == undefined || headerHeight == undefined) {
        return;
      }

      if (windowY > 0 && !isSticky) {
        setSticky(true);
      }

      if (windowY <= 0 && isSticky) {
        setSticky(false);
      }
    },
    [isSticky, headerHeight]
  );

  const windowResize = () => {
    const headerHeight: number | undefined =
      headerRef.current?.getBoundingClientRect().height;

    headerHeight && setHeaderHeight(headerHeight);
  };

  return (
    <header
      className={classNames(styles.wrap, styles.sticky)}
      onClick={(event) => onClick(event)}
      style={{
        height: headerHeight,
      }}
    >
      <div ref={headerRef} className={classNames(styles.headerInner)}>
        <HeaderMid />
        <HeaderBottom />
      </div>
    </header>
  );
}
