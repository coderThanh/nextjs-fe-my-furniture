import { MEDIA_MAX_SM, MEDIA_MAX_XS } from '@/consts/const'
import classNames from 'classnames'

export default function Gap({ large = 30, medium, small }) {
  return (
    <>
      <style jsx>
        {`
          .gap {
            padding-top: ${large}px;
          }

          @media only screen and (max-width: ${MEDIA_MAX_SM}px) {
            .gap {
              padding-top: ${medium ?? large}px;
            }
          }

          @media only screen and (max-width: ${MEDIA_MAX_XS}px) {
            .gap {
              padding-top: ${small ?? large}px;
            }
          }
        `}
      </style>
      <div
        data-large={large}
        data-medium={medium}
        data-small={small}
        className={classNames('gap')}
      ></div>
    </>
  )
}
