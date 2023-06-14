import classNames from "classnames";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import HeaderMid from "./header-mid";
import HeaderBottom from "./header-bottom";
import HeaderMobileMid from "./header-mobile-mid";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Header() {
  // Windown scroll to sticky
  const headerRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [stateIsSticky, setIsSticky] = useState<boolean>(false);

  // Check resize chagne height
  const setHeightHeader = useCallback(() => {
    const headerHeight: number | undefined =
      headerRef.current?.getBoundingClientRect().height;

    headerHeight && setHeaderHeight(headerHeight);
  }, []);

  // Run CLient first
  useEffect(() => {
    window.addEventListener("resize", setHeightHeader);

    // component didmount
    return () => {
      window.removeEventListener("resize", setHeightHeader);
    };
  }, [setHeightHeader]);

  // Set sticky on sctroll
  const { scrollY } = useScroll();

  const spaceToRun: number = 800;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (
      headerHeight < latest &&
      latest < headerHeight + spaceToRun &&
      !stateIsSticky
    ) {
      // Some time get data delay height header
      setHeightHeader();
    } else if (latest >= headerHeight + spaceToRun && !stateIsSticky) {
      setIsSticky(true);
    } else if (latest < headerHeight + spaceToRun && stateIsSticky) {
      setIsSticky(false);
    }
  });

  // Animation variabnle
  const variants = {
    sticking: { y: [-100, 0] },
    normal: { y: "" },
  };

  return (
    <header
      className={classNames("header-wrap", { sticky: stateIsSticky })}
      style={{
        height: stateIsSticky ? headerHeight : undefined,
      }}
    >
      <motion.div
        ref={headerRef}
        className={classNames("header-inner ")}
        animate={stateIsSticky ? "sticking" : "normal"}
        variants={variants}
        transition={{
          type: "tween",
        }}
      >
        <HeaderMid />
        <HeaderMobileMid />
        <HeaderBottom />
      </motion.div>
    </header>
  );
}
