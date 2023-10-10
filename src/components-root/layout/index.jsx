import classNames from 'classnames'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './layout.module.scss'
import { isMaintainMode } from '@/helpers'
import MainTain from '@/components-root/maintain'

export default function Layout({ children, className }) {
  const isMainTained = isMaintainMode()

  return (
    <>
      <main id="main" className={classNames(styles.main, className)}>
        {isMainTained && <MainTain />}
        {!isMainTained && children}
      </main>
      {/* Anount popup */}
      <ToastContainer />
    </>
  )
}
