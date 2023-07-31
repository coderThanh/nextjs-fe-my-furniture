import HeaderMenuDropDown from '@/components-root/header-menu-dropdown'
import AppLink from '@/components-root/link'
import classNames from 'classnames'
import { classChildrenLink, classMenuLink, classMenuSub } from '.'

export function HeaderMidMenuDropdown(props) {
  return (
    <>
      <HeaderMenuDropDown
        title={
          <AppLink
            url={props.item.url}
            target={props.item.target ? '_' + props.item.target : ''}
            rel={props.item.rel}
            classLink={classNames(classMenuLink, 'parent')}
          >
            {props.item.title}
          </AppLink>
        }
        classChildren={classNames(classMenuSub)}
        isShowHover={true}
        isOpen={false}
      >
        <>
          {props.item.children?.map((child, index) => (
            <AppLink
              key={index}
              url={child.url}
              classLink={classNames(classChildrenLink, classMenuLink)}
              target={child.target ? '_' + child.target : ''}
              rel={child.rel}
            >
              {child.title}
            </AppLink>
          ))}
        </>
      </HeaderMenuDropDown>
    </>
  )
}
