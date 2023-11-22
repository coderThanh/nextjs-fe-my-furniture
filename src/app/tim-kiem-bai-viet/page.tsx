import Footer from '@/app/(components)/footer'
import Header from '@/app/(components)/header'
import BodySearchBlogs from '@/app/(post)/(components)/search-body-loop'
import WrapSWRConfig from '@/components-root/swr-wrap'
import UIBreadcrumb from '@/ui/breadcrumb'
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
        <Header />
        <UIBreadcrumb name={'Tìm kiếm'} />
        <BodySearchBlogs searchOptions={searchParams} />
        <Footer />
      </WrapSWRConfig>
    </>
  )
}
