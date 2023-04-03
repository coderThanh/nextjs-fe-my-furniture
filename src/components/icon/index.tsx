import _IconAccount from "/public/svgs/account.svg";
import _IconHearth from "/public/svgs/hearth.svg";
import _IconCart from "/public/svgs/cart.svg";
import _IconMenu from "/public/svgs/menu-dashed.svg";
import _IconSearch from "/public/svgs/search.svg";
import _IconFavour from "/public/svgs/favour.svg";
import _IconNotify from "/public/svgs/notify.svg";
import _IconEsc from "/public/svgs/esc.svg";

import { CSSProperties } from "react";

export type IconSvgProps = {
  className?: string;
  style?: CSSProperties;
};

export function IconSearch(props: IconSvgProps) {
  return <_IconSearch className={props.className} style={{ ...props.style }} />;
}

export function IconAccount(props: IconSvgProps) {
  return (
    <_IconAccount className={props.className} style={{ ...props.style }} />
  );
}
export function IconHearth(props: IconSvgProps) {
  return <_IconHearth className={props.className} style={{ ...props.style }} />;
}

export function IconCart(props: IconSvgProps) {
  return <_IconCart className={props.className} style={{ ...props.style }} />;
}

export function IconMenu(props: IconSvgProps) {
  return <_IconMenu className={props.className} style={{ ...props.style }} />;
}

export function IconFavour(props: IconSvgProps) {
  return <_IconFavour className={props.className} style={{ ...props.style }} />;
}

export function IconNotify(props: IconSvgProps) {
  return <_IconNotify className={props.className} style={{ ...props.style }} />;
}

export function IconEsc(props: IconSvgProps) {
  return <_IconEsc className={props.className} style={{ ...props.style }} />;
}
