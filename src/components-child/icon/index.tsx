import _IconAccount from '/public/svgs/account.svg'
import _IconArrowNext from '/public/svgs/arrow-next.svg'
import _IconArrowPrevious from '/public/svgs/arrow-previous.svg'
import _IconCart from '/public/svgs/cart.svg'
import _IconClose from '/public/svgs/close.svg'
import _IconEsc from '/public/svgs/esc.svg'
import _IconFavour from '/public/svgs/favour.svg'
import _IconHearth from '/public/svgs/hearth.svg'
import _IconMenu from '/public/svgs/menu-dashed.svg'
import _IconNotify from '/public/svgs/notify.svg'
import _IconSearch from '/public/svgs/search.svg'

export function IconSearch(props) {
  return <_IconSearch className={props.className} style={{ ...props.style }} />
}

export function IconAccount(props) {
  return <_IconAccount className={props.className} style={{ ...props.style }} />
}
export function IconHearth(props) {
  return <_IconHearth className={props.className} style={{ ...props.style }} />
}

export function IconCart(props) {
  return <_IconCart className={props.className} style={{ ...props.style }} />
}

export function IconMenu(props) {
  return <_IconMenu className={props.className} style={{ ...props.style }} />
}

export function IconFavour(props) {
  return <_IconFavour className={props.className} style={{ ...props.style }} />
}

export function IconNotify(props) {
  return <_IconNotify className={props.className} style={{ ...props.style }} />
}

export function IconEsc(props) {
  return <_IconEsc className={props.className} style={{ ...props.style }} />
}

export function IconArrowNext(props) {
  return (
    <_IconArrowNext className={props.className} style={{ ...props.style }} />
  )
}

export function IconArrowPrevious(props) {
  return (
    <_IconArrowPrevious
      className={props.className}
      style={{ ...props.style }}
    />
  )
}

export function IconClose(props) {
  return <_IconClose className={props.className} style={{ ...props.style }} />
}
