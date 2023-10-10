import '@/styles/index.scss'

import AppAssets from '@/consts/assets'
import WrapProvider from '@/redux/provider'
import Head from 'next/head'

import { DESCRIPTION_PAGE, TITLE_PAGE } from '@/consts/const'
import { Barlow_Condensed, Josefin_Sans, Open_Sans } from 'next/font/google'

const opentSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
})

const josenfinSans = Josefin_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
})

const barlowCondesed = Barlow_Condensed({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{TITLE_PAGE}</title>
        <meta name="description" content={DESCRIPTION_PAGE} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={AppAssets.faviIcon} />
      </Head>

      <style jsx global>{`
        :root {
          // Fonts
          --font-family: ${opentSans.style.fontFamily}, sans-serif;
          --font-family-title: ${josenfinSans.style.fontFamily},
            ${barlowCondesed.style.fontFamily}, sans-serif;

          // Colors
          --primary: #ff6600;
          --on-primary: #fff;
          --primary-container: #205e61;
          --on-primary-container: #e5f2ef;

          --secondary: #181823;
          --on-secondary: #fff;
          --secondary-container: #545457;
          --on-secondary-container: #efefef;

          --tertiary: #49c8da;
          --on-tertiary: #fff;
          --tertiary-container: #308f9d;
          --on-tertiary-container: #e6f1f3;

          --error: #d61355;
          --on-error: #fff;
          --error-container: #9d1543;
          --on-error-container: #f6eef1;

          --background: #fff;
          --on-background: #636363;
          --surface: #041e37;
          --on-surface: #f6f7f8;

          --color-neutral1: #f6f7f8;
          --color-neutral2: #ccc;
          --color-neutral3: #eeeeee;

          --color-title: #041e37;
          --color-basic: #333;
          --link-basic: #333;
          --link-hover: #ff6600;

          --box-shadown1: 3px 0px 7px 1px rgb(0 0 0 / 5%);
          --box-shadown2: 0 0.75rem 6rem rgba(56, 65, 74, 0.03);
        }
      `}</style>

      <WrapProvider>
        <Component {...pageProps} />
      </WrapProvider>
    </>
  )
}
