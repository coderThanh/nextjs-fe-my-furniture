import MenuItem from '@/app/(components)/header/menu-item'
import { useSVMenuHeaderBottom } from '@/hooks/use-menu'
import classNames from 'classnames'

type Props = {
  data: any[]
}
export default function HeaderBottom({ data }: Props) {
  return (
    <div
      className={
        'container-sm header-bot desk container-gap-collapse pl-10 px-sm-2'
      }
    >
      <div className={'bot-inner'}>
        <div className={classNames('bot-nav_left', 'nav')}>
          {data?.map((item, index) => (
            <MenuItem
              key={index}
              title={item?.title}
              url={item?.url}
              rel={item?.rel}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
