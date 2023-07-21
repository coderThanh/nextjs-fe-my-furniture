import classNames from 'classnames'
import { useSelector } from 'react-redux'
import styles from './layout.module.scss'

export const LayoutType = {
  container: 'container',
  containerFluid: 'container-fluid',
  full: 'full',
}

export const LayoutAsideType = {
  leftFix: 'leftFix',
  no: 'no',
}

export default function Layout(props) {
  // Redux
  const isAsideLeftOpen = useSelector((state) => state.aside.isLeftOpen)

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
              : '',
            !isAsideLeftOpen ? styles.asideLeftClose : '',
            'layout-wrap',
          )}
        >
          <div
            className={classNames(
              { 'container-fluid': props.type == LayoutType.containerFluid },
              props.type == LayoutType.container ? 'container-lg' : '',
              styles.inner,
              'layout-inner',
            )}
          >
            {props.children}
          </div>

          <div className={classNames(styles.bg, 'layout-bg')}></div>
        </div>
        {props.footer}
      </main>
    </>
  )
}
