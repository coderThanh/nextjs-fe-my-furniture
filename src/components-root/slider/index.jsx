import classNames from 'classnames'

import { MEDIA_MAX_MD, MEDIA_MAX_XS } from '@/consts/const'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconArrowNext, IconArrowPrevious } from '../../components-child/icon'
import styles from './slider.module.scss'

export default function Slider(props) {
  const DEFAULT_DURATION = 0.4

  const [itemWidth, setItemWidth] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [translateXCurrent, setTranslateXCurrent] = useState(0)

  const isDragging = useRef(false)

  const pointerStart = useRef(0)
  const translateXWhenStart = useRef(0)
  const windowWidth = useRef(0)
  const sliderWidth = useRef(0)
  const numberItemShow = useRef(props.lg)

  const transTime = useRef(0)

  const sliderRef = useRef(null)

  //method set item width
  const changeWidth = useCallback(() => {
    windowWidth.current = window.innerWidth

    if (sliderRef.current?.getBoundingClientRect().width) {
      sliderWidth.current = sliderRef.current?.getBoundingClientRect().width
    }

    if (
      windowWidth.current <= MEDIA_MAX_MD &&
      windowWidth.current > MEDIA_MAX_XS
    ) {
      numberItemShow.current = props.md
      setItemWidth(sliderWidth.current / props.md)

      return
    } else if (windowWidth.current <= MEDIA_MAX_XS) {
      numberItemShow.current = props.sm
      setItemWidth(sliderWidth.current / props.sm)
      return
    }

    numberItemShow.current = props.lg
    setItemWidth(sliderWidth.current / props.lg)
  }, [props.lg, props.md, props.sm, sliderRef])

  //  Change current index with validate
  const setIndexNext = useCallback(
    (nextIndex) => {
      var maxX = (props.count - numberItemShow.current) * itemWidth

      if (nextIndex > props.count - Math.floor(numberItemShow.current)) {
        setCurrentIndex(0)
        setTranslateXCurrent(0)
      } else if (nextIndex < 0) {
        setCurrentIndex(props.count - Math.floor(numberItemShow.current))
        setTranslateXCurrent(maxX * -1)
      } else {
        setCurrentIndex(nextIndex)
        var nextMargin = nextIndex * itemWidth * -1
        if (nextMargin < maxX * -1) {
          setTranslateXCurrent(maxX * -1)
        } else {
          setTranslateXCurrent(nextMargin)
        }
      }
    },
    [itemWidth, props.count],
  )

  // Handle poiter up + touch end
  const whenActionUp = useCallback(() => {
    if (!isDragging.current) return

    var maxX = (props.count - numberItemShow.current) * itemWidth

    transTime.current = DEFAULT_DURATION

    if (translateXCurrent > 0) {
      // go to first item

      setIndexNext(0)
    } else if (translateXCurrent + maxX < 0) {
      // go to last item
      var lastIndex = props.count - Math.floor(numberItemShow.current)

      setIndexNext(lastIndex)
    } else if (translateXWhenStart.current - translateXCurrent > 0) {
      // go right
      setIndexNext(
        currentIndex -
          Math.floor(
            (translateXCurrent - translateXWhenStart.current) / itemWidth,
          ),
      )
    } else if (translateXWhenStart.current - translateXCurrent < 0) {
      // go left
      setIndexNext(
        currentIndex -
          Math.ceil(
            (translateXCurrent - translateXWhenStart.current) / itemWidth,
          ),
      )
    }

    isDragging.current = false
    // isUseTouch.current = false;
    translateXWhenStart.current = 0
    pointerStart.current = 0
  }, [currentIndex, itemWidth, props.count, setIndexNext, translateXCurrent])

  const onPan = useCallback((event, info) => {
    if (!isDragging.current) return

    // Reset transition
    transTime.current = 0

    setTranslateXCurrent(
      translateXWhenStart.current - (pointerStart.current - info.point.x),
    )
  }, [])

  const onPanStart = useCallback(
    (event, info) => {
      pointerStart.current = info.point.x
      translateXWhenStart.current = translateXCurrent
      isDragging.current = true
    },
    [translateXCurrent],
  )

  const onPanEnd = useCallback(
    (event, info) => {
      if (!isDragging.current) return

      whenActionUp()
    },
    [whenActionUp],
  )

  // When button click
  const onClickNext = () => {
    transTime.current = DEFAULT_DURATION
    setIndexNext(currentIndex + 1)
  }

  const onClickPrevious = () => {
    transTime.current = DEFAULT_DURATION
    setIndexNext(currentIndex - 1)
  }

  // run method change width item
  useEffect(() => {
    changeWidth()

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [changeWidth, itemWidth])

  return (
    <>
      <div
        ref={sliderRef}
        className={classNames(props.classWrap, 'slider', styles.wrap)}
      >
        <motion.div
          onPan={(event, info) => onPan(event, info)}
          onPanStart={(event, info) => onPanStart(event, info)}
          onPanEnd={(event, info) => onPanEnd(event, info)}
          className={classNames(styles.view, 'slider-view')}
        >
          <motion.div
            layout
            className={classNames(styles.inner, 'slider-inner')}
            animate={{ x: translateXCurrent }}
            transition={{
              type: 'tween',
              duration: transTime.current,
            }}
          >
            {Array(props.count)
              .fill(null)
              .map((item, index) => (
                <div
                  key={index}
                  className={classNames(
                    'slider-item',
                    styles.item,
                    index == currentIndex ? styles.current : '',
                    index == currentIndex ? 'current' : '',
                  )}
                  style={{
                    flex: `0 0 ${itemWidth}px`,
                  }}
                >
                  {props.build(index)}
                </div>
              ))}
          </motion.div>
        </motion.div>
        {props.isShowButton && (
          <>
            <div
              onClick={(event) => onClickPrevious()}
              className={classNames(
                styles.btn,
                styles.btnPrev,
                'slider-btn prev',
              )}
            >
              <IconArrowPrevious />
            </div>
            <div
              onClick={(event) => onClickNext()}
              className={classNames(
                styles.btn,
                styles.btnNext,
                'slider-btn next',
              )}
            >
              <IconArrowNext />
            </div>
          </>
        )}
        {props.isShowFooter && (
          <div className={classNames(styles.footer, 'slider-footer')}>
            {Array(props.count - Math.floor(numberItemShow.current) + 1)
              .fill(null)
              .map((value, index) => (
                <div
                  key={index}
                  onClick={(event) => setIndexNext(index)}
                  className={classNames(
                    styles.dot,
                    'slider-dot',
                    index == currentIndex ? styles.current : '',
                    index == currentIndex ? 'current' : '',
                  )}
                ></div>
              ))}
          </div>
        )}
        {props.buildThumb && (
          <div className={classNames('slider-thumb-wrap')}>
            {Array(props.count - Math.floor(numberItemShow.current) + 1)
              .fill(null)
              .map((value, index) => (
                <div
                  onClick={(event) => setIndexNext(index)}
                  key={index}
                  className={classNames(
                    'slider-thumb',
                    index == currentIndex ? 'current' : '',
                  )}
                >
                  {props.buildThumb && props.buildThumb(index)}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}
