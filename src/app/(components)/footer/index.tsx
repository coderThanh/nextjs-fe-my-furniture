import FooterWrap from '@/app/(components)/footer/footer-wrap'
import { useServerFooterCopyright } from '@/services/hooks/hookThemeSv'
import classNames from 'classnames'
import styles from './footer.module.scss'

export default function Footer() {
  // fetch
  const { data } = useServerFooterCopyright()

  return (
    <>
      <FooterWrap>
        <div className={classNames('', styles.innerWrap)}>
          <div
            className={classNames(styles.content, 'footer-content container')}
          >
            {data?.length > 0 ? (
              <div dangerouslySetInnerHTML={{ __html: data }} />
            ) : (
              <p>Copyright 2023 Furmi</p>
            )}
          </div>
          <span className={classNames(styles.bg, 'footer-bg')}></span>
        </div>
      </FooterWrap>
    </>
  )
}
