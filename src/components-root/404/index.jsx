import Image from 'next/image'
import Link from 'next/link'

import error from 'public/images/error/error.png'

import styles from './404.module.scss'
import classNames from 'classnames'

export const Content404 = () => {
  return (
    <>
      <section className="404-area">
        <div className="container mb-150">
          <div className="row justify-content-center">
            <div className="col">
              <div className="text-center">
                <div className="">
                  <Image src={error} alt="error img" priority={true} />
                </div>

                <h3 className="">Nội dung không tồn tại</h3>
                <p>
                  Nội dung bạn cần tìm không tồn tại{' '}
                  <Link href="/" className={classNames(styles.link)}>
                    trở về trang chủ
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
