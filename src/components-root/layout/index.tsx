'use client'

import MainTain from '@/components-root/maintain'
import { isMaintainMode } from '@/helpers'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { barlowCondensed, josenfinSans, opentSans } from '@/app/fonts'
import classNames from 'classnames'
import styles from './layout.module.scss'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  const isMainTained = isMaintainMode()

  return (
    <>
      <style jsx global>{`
        :root {
          // Fonts
          --font-family: ${opentSans.style.fontFamily}, sans-serif;
          --font-family-title: ${josenfinSans.style.fontFamily},
            ${barlowCondensed.style.fontFamily}, sans-serif;

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

      <main id="main" className={classNames(styles.main)}>
        {isMainTained && <MainTain />}
        {!isMainTained && children}
      </main>
      {/* Anount popup */}
      <ToastContainer />
    </>
  )
}
