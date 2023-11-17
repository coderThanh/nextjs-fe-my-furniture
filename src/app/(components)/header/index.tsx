import HeaderBottom from '@/app/(components)/header/header-bottom'
import HeaderMid from '@/app/(components)/header/header-mid'
import HeaderMobileMid from '@/app/(components)/header/header-mobile-mid'
import HeaderWrap from '@/app/(components)/header/header-wrap'
import {
  useSVMenuHeaderBottom,
  useSVMenuHeaderMiddle,
  useSVMenuHeaderMobile,
} from '@/hooks/use-menu'

// Define class tag
export const classMenuItem = 'menu-item'
export const classMenuLink = 'menu-link'
export const classMenuIcon = 'menu-icon'
export const classMenuSub = 'menu-sub'
export const classMenuSubFull = 'menu-sub_full'
export const classNav = 'nav'
export const classNavInner = 'nav-inner'
export const classHasChildren = 'has-children'
export const classChildrenLink = 'children-link'
export const classFull = 'full'
export const classMenuListTitle = 'menu-list-title'

export default function Header() {
  // hook
  const { menuData: dataBottom } = useSVMenuHeaderBottom()

  const { menuData: dataMiddle } = useSVMenuHeaderMiddle()

  const { menuData: dataMobile } = useSVMenuHeaderMobile()

  return (
    <>
      <HeaderWrap>
        <HeaderMobileMid data={dataMobile} />
        <HeaderMid data={dataMiddle} />
        <HeaderBottom data={dataBottom} />
      </HeaderWrap>
    </>
  )
}
