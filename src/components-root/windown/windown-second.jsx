import classNames from 'classnames'
import { ReactElement, MouseEvent, useState, useEffect } from 'react'

import styles from './windown.module.scss'
import { IconArrowPrevious } from '../../components-child/icon'

export default function WindownSecondE(props) {
  const [isShow, setShow] = useState(props.isShow)
  // Event onclick
  function onClick(event) {
    props.onClick && props.onClick(!isShow)
    setShow(!isShow)
  }

  useEffect(() => {
    setShow(props.isShow)
  }, [props.isShow])

  return (
    <>
      {props.neighbor && (
        <div
          className={classNames('windown-2nd-neighb', props.classNeighbor)}
          onClick={(e) => onClick(e)}
        >
          {props.neighbor}
        </div>
      )}
      <div
        className={classNames(
          styles.secondWrap,
          'windown-2nd-wrap',
          props.classWrap,
          isShow ? styles.show : '',
        )}
      >
        <div className={classNames(styles.secondInner, 'windown-2nd-inner')}>
          <div
            className={classNames(styles.secondContent, 'windown-2nd-content')}
          >
            <div
              onClick={(e) => onClick(e)}
              className={classNames(styles.secondHead, 'windown-2nd-head')}
            >
              <IconArrowPrevious
                className={classNames(styles.secondIconBack)}
              />
              <span
                className={classNames(styles.secondTitle, 'windown-2nd-title')}
              >
                {props.title}
              </span>
            </div>
            <div className={classNames(styles.secondBody, 'windown-2nd-body')}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
