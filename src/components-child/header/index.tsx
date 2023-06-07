import classNames from "classnames";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { debounce } from "@/controllers-root/debounce";
import { clickHeader } from "@/redux/features-root/root_click/slice";

import HeaderMid from "./header-mid";
import HeaderBottom from "./header-bottom";
import HeaderMobileMid from "./header-mobile-mid";

export default function Header() {
  const dispatch = useDispatch();

  // To change global state onClick on main / header / body
  const headerDebouncer = debounce(() => {
    dispatch(clickHeader());
  }, 220);

  // Windown scroll to sticky
  const headerRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useState<number>(0);

  // Check resize chagne height
  const setHeightHeader = useCallback(() => {
    const headerHeight: number | undefined =
      headerRef.current?.getBoundingClientRect().height;

    headerHeight && setHeaderHeight(headerHeight);
  }, []);

  useEffect(() => {
    setHeightHeader();

    window.addEventListener("resize", setHeightHeader);
    // component didmount
    return () => {
      window.removeEventListener("resize", setHeightHeader);
    };
  }, [headerHeight, setHeightHeader]);

  // method
  function onClick(event: MouseEvent<HTMLElement>) {
    headerDebouncer();
  }

  return (
    <header
      className={classNames("header-wrap", "sticky")}
      onClick={(event) => onClick(event)}
      style={{
        height: headerHeight,
      }}
    >
      <div ref={headerRef} className={classNames("header-inner")}>
        <HeaderMid />
        <HeaderMobileMid />
        <HeaderBottom />
      </div>
    </header>
  );
}
