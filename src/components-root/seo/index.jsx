import { DESCRIPTION_PAGE, TITLE_PAGE } from '@/consts/const'
import Head from 'next/head'

export default function SEO({ pageTitle, description }) {
  return (
    <>
      <Head>
        <title>{pageTitle || DESCRIPTION_PAGE}</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content={description || TITLE_PAGE} />
        <meta name="robots" content="noindex, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/assets/img/logo/azpc-favicon.png" />
      </Head>
    </>
  )
}
