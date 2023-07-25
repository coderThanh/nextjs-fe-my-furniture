import classNames from 'classnames'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './layout.module.scss'

export default function Layout({ children, className }) {
  return (
    <>
      <main id="main" className={classNames(styles.main, className)}>
        {children}
      </main>
      {/* Anount popup */}
      <ToastContainer />
    </>
  )
}
