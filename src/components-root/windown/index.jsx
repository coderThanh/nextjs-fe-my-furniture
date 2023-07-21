import classNames from 'classnames'
import React, { MouseEvent, ReactElement, useEffect, useState } from 'react'

import styles from './windown.module.scss'
import { IconClose } from '../../components-child/icon'

export default function WindownE(props) {
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
          className={classNames('windown-neighb', props.classNeighbor)}
          onClick={(e) => onClick(e)}
        >
          {props.neighbor}
        </div>
      )}
      <div
        className={classNames(
          styles.wrap,
          'windown-wrap',
          props.classWrap,
          isShow ? styles.show : '',
        )}
      >
        <div className={classNames(styles.inner, 'windown-inner')}>
          <div className={classNames(styles.content, 'windown-content')}>
            {props.children}
          </div>
          <div
            onClick={(e) => onClick(e)}
            className={classNames(styles.bg, 'windown-bg')}
          ></div>
          <div
            onClick={(e) => onClick(e)}
            className={classNames(styles.close, 'windown-close')}
          >
            <IconClose
              className={classNames(styles.iconClose, '"windown-icon-close"')}
            />
          </div>
        </div>
      </div>
    </>
  )
}
