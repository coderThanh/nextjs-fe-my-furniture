import { useState, useEffect, ReactNode } from "react";

export type ResponsiveProps = {
  desktopBig?: JSX.Element;
  desktop: JSX.Element;
  table?: JSX.Element;
  phone?: JSX.Element;
};

export default function Responsive(props: ResponsiveProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  const maxPhone: number = 575;
  const maxTable: number = 768;
  const maxDesktop: number = 1024;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window != undefined) {
      handleWindowResize();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  if (props.phone && windowWidth <= maxPhone) {
    return props.phone;
  }

  if (props.table && windowWidth <= maxTable) {
    return props.table;
  }

  if (props.desktopBig && windowWidth > maxDesktop) {
    return props.desktopBig;
  }

  return props.desktop;
}
