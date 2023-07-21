import classNames from 'classnames'
import AppLink from '../link'
import styles from './breadcrumb.module.scss'

export default function BreadCrumb(props) {
  const divider = (
    <span className={classNames(styles.divi, 'breadcrumb-divi')}>
      {props.divider || ' / '}
    </span>
  )

  return (
    <>
      <div className={classNames(styles.wrap, 'breadcrumb-wrap')}>
        {props.listLink &&
          props.listLink.map((item, index) => (
            <div
              key={index}
              className={classNames(styles.item, 'breadcrumb-item')}
            >
              <AppLink
                url={item.link}
                classLink={classNames(styles.link, 'breadcrumb-link')}
              >
                {item.name}
              </AppLink>
              {props.listLink && index < props.listLink?.length - 1
                ? divider
                : null}
            </div>
          ))}
        {props.name && props.listLink && divider}
        {props.name && (
          <span className={classNames(styles.item, 'breadcrumb-item current')}>
            {props.name}
          </span>
        )}
      </div>
    </>
  )
}
