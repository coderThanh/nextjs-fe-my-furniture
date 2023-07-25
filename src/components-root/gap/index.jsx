import AppConst from '@/models/const'
import classNames from 'classnames'

export default function Gap({ large = 30, medium, small }) {
  return (
    <>
      <style jsx>
        {`
          .gap {
            padding-top: ${large}px;
          }

          @media only screen and (max-width: ${AppConst.mediaMaxMedium}px) {
            .gap {
              padding-top: ${medium ?? large}px;
            }
          }

          @media only screen and (max-width: ${AppConst.mediaMaxSmall}px) {
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
