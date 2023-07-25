import classNames from 'classnames'
import AppLink from '../link'
import styles from './breadcrumb.module.scss'

export default function BreadCrumb({ divider, listLink, name }) {
  const dividerContent = (
    <span className={classNames(styles.divi, 'breadcrumb-divi')}>
      {divider || ' / '}
    </span>
  )

  return (
    <>
      <div className={classNames(styles.wrap, 'breadcrumb-wrap')}>
        {listLink &&
          listLink.map((item, index) => (
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
              {listLink && index < listLink?.length - 1 ? dividerContent : null}
            </div>
          ))}
        {name && listLink && dividerContent}
        {name && (
          <span className={classNames(styles.item, 'breadcrumb-item current')}>
            {name}
          </span>
        )}
      </div>
    </>
  )
}
