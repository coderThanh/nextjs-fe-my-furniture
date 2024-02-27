import UIBreadcrumb from '@/app/(components)/breadcrumb'
import BodySearchBlogs from '@/app/(layout-default)/(post)/(components)/search-body-loop'
import WrapSWRConfig from '@/components-root/swr-wrap'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tìm kiếm',
}

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default function SearchPage({ searchParams }: Props) {
  return (
    <>
      <WrapSWRConfig value={{}}>
        <UIBreadcrumb name={'Tìm kiếm'} />
        <BodySearchBlogs searchOptions={searchParams} />
      </WrapSWRConfig>
    </>
  )
}
