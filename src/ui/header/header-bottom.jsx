import AppLink from '@/components-root/link'
import { isCurrentUrl } from '@/helpers'
import { useMenuHeaderBottom } from '@/hooks'
import classNames from 'classnames'
import { useRouter } from 'next/router'

export default function HeaderBottom() {
  const router = useRouter()
  const { menuData } = useMenuHeaderBottom()

  return (
    <div
      className={
        'container-sm header-bot desk container-gap-collapse pl-10 px-sm-2'
      }
    >
      <div className={'bot-inner'}>
        <div className={classNames('bot-nav_left', 'nav')}>
          {menuData?.map((item, index) => (
            <div
              key={index}
              className={classNames('menu-item', {
                current: isCurrentUrl(item.url, router.asPath),
              })}
            >
              <AppLink
                url={item.url}
                className={'menu-link'}
                target={item.target ? '_' + item.target : ''}
                rel={item.rel}
              >
                {item.title}
              </AppLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
