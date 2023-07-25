import AppLink from '@/components-root/link'
import GraphQLQuery from '@/models/graphql/graphql-query'
import { parseToMenuItem } from '@/models/menus/controller'
import SWRKey from '@/consts/swr-key'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const dataDemo = [
  { title: 'Trang chủ', url: '/', target: '' },
  {
    title: 'Chuyện nhà',
    url: '/category',
    target: '_blank',
    rel: 'nofollow',
  },
  { title: 'Xu hướng', url: '/category', target: '' },
  { title: 'Zen', url: '/category', target: '' },
  { title: 'Wabi sabi', url: '/category', target: '' },
  { title: 'Mid Centry', url: '/category', target: '' },
  { title: 'Minimalism', url: '/category', target: '' },
  { title: 'Scandinavian', url: '/category', target: '' },
  { title: 'Tin tức', url: '/category', target: '' },
  { title: 'Liên hệ', url: '#', target: '' },
]

export default function HeaderBottom() {
  var listMenu = []

  const router = useRouter()

  // const { data } = useSWR([
  //   SWRKey.headerBottom,
  //   GraphQLQuery.getMenuHeaderParent,
  //   {
  //     slug: process.env.NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG,
  //   },
  // ])

  const data = {}

  // console.log("HeaderBottom data ", data);

  if (!process.env.NEXT_PUBLIC_HAS_API_DB_CONECT) {
    listMenu.push(...dataDemo)
  } else if (data && data.menusMenus && data.menusMenus.data) {
    const dataMenuBottom = data.menusMenus.data[0].attributes.items.data

    dataMenuBottom.forEach((item) => {
      listMenu.push(parseToMenuItem(item))
    })
  }

  return (
    <div className={'container header-bot desk'}>
      <div className={'bot-inner'}>
        <div className={classNames('bot-nav_left', 'nav')}>
          {listMenu.map((item, index) => (
            <div
              key={index}
              className={classNames('menu-item', {
                current: router.pathname == item.url,
              })}
            >
              <AppLink
                url={item.url}
                classLink={'menu-link'}
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
