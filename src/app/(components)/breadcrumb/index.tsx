import BreadCrumb from '@/components-root/breadcrumb'
import classNames from 'classnames'

type Props = {
  name: string
  className?: string
}

export default function UIBreadcrumb({ name, className }: Props) {
  return (
    <>
      <section className={classNames('breadcrumb-page', className)}>
        <div className="section-inner container">
          <BreadCrumb
            listLink={[
              {
                name: 'Trang chủ',
                link: '/',
              },
            ]}
            name={name}
          />
        </div>
      </section>
    </>
  )
}
