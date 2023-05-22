import classNames from "classnames";

import styles from "./slider.module.scss";
import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  PointerEvent,
  TouchEvent,
} from "react";
import AppConst from "@/models/const";
import { motion } from "framer-motion";
import { IconArrowNext, IconArrowPrevious } from "../icon";

export type SliderProps = {
  count: number;
  build: SliderBuild;
  buildThumb?: SliderBuild;
  lg: number;
  md: number;
  sm: number;
  autoMiliSecond?: number;
  isShowButton?: boolean;
  isShowFooter?: boolean;
  classWrap?: string;
};

export type SliderBuild = (index: number) => ReactNode;

export default function Slider(props: SliderProps): JSX.Element {
  const [itemWidth, setItemWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateXCurrent, setTranslateXCurrent] = useState(0);

  const isDragging = useRef(false);
  const isUseTouch = useRef(false);

  const pointerStart = useRef(0);
  const translateXWhenStart = useRef(0);
  const windowWidth = useRef(0);
  const sliderWidth = useRef(0);
  const numberItemShow = useRef(props.lg);

  const transTime = useRef(0.6);

  const sliderRef = useRef<HTMLDivElement>(null);

  //method set item width
  const changeWidth = useCallback(() => {
    windowWidth.current = window.innerWidth;

    if (sliderRef.current?.getBoundingClientRect().width) {
      sliderWidth.current = sliderRef.current?.getBoundingClientRect().width;
    }

    if (
      windowWidth.current <= AppConst.mediaMaxMedium &&
      windowWidth.current > AppConst.mediaMaxSmall
    ) {
      numberItemShow.current = props.md;
      setItemWidth(sliderWidth.current / props.md);

      return;
    } else if (windowWidth.current <= AppConst.mediaMaxSmall) {
      numberItemShow.current = props.sm;
      setItemWidth(sliderWidth.current / props.sm);
      return;
    }

    numberItemShow.current = props.lg;
    setItemWidth(sliderWidth.current / props.lg);
  }, [props.lg, props.md, props.sm]);

  // Set Translate with validate
  const setTranslateXNext = useCallback(
    (nextMargin: number): void => {
      var maxX: number = (props.count - numberItemShow.current) * itemWidth;

      if (nextMargin < maxX * -1) {
        setTranslateXCurrent(
          (props.count - numberItemShow.current) * itemWidth * -1
        );
        return;
      }

      setTranslateXCurrent(nextMargin);
    },
    [itemWidth, props.count]
  );

  //  Change current index with validate
  const setIndexNext = useCallback(
    (nextIndex: number) => {
      if (nextIndex > props.count - Math.floor(numberItemShow.current)) {
        setCurrentIndex(0);
        setTranslateXNext(0);
      } else if (nextIndex < 0) {
        setCurrentIndex(props.count - Math.floor(numberItemShow.current));
        setTranslateXNext(
          (props.count - numberItemShow.current) * itemWidth * -1
        );
      } else {
        setCurrentIndex(nextIndex);
        setTranslateXNext(nextIndex * itemWidth * -1);
      }
    },
    [itemWidth, props.count, setTranslateXNext]
  );

  // Handle poiter up + touch end
  const whenActionUp = useCallback(
    (pointerEnd: number): void => {
      if (!isDragging.current) return;

      var maxX: number = (props.count - numberItemShow.current) * itemWidth;

      transTime.current = 0.6;

      if (translateXCurrent > 0) {
        // go to first item
        setIndexNext(0);
      } else if (translateXCurrent + maxX < 0) {
        // go to last item
        var lastIndex = props.count - Math.floor(numberItemShow.current);

        setIndexNext(lastIndex);
        // setTranslateXNext((props.count - numberItemShow) * itemWidth * -1);
      } else if (translateXWhenStart.current - translateXCurrent > 0) {
        // go right
        var lengthGone = translateXCurrent - translateXWhenStart.current;

        setIndexNext(currentIndex + Math.floor(lengthGone / itemWidth) * -1);
      } else if (translateXWhenStart.current - translateXCurrent < 0) {
        // go left
        var lengthGone = translateXCurrent - translateXWhenStart.current;

        setIndexNext(currentIndex - Math.ceil(lengthGone / itemWidth));
      }

      isDragging.current = false;
      isUseTouch.current = false;
      translateXWhenStart.current = 0;
      pointerStart.current = 0;
    },
    [currentIndex, itemWidth, props.count, setIndexNext, translateXCurrent]
  );

  // When event poiter down
  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      pointerStart.current = event.pageX;
      translateXWhenStart.current = translateXCurrent;
      isDragging.current = true;
    },
    [translateXCurrent]
  );

  const onTouchDown = useCallback((event: TouchEvent<HTMLDivElement>) => {
    isUseTouch.current = true;
  }, []);

  // When event poiter up / touch end
  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      if (isUseTouch.current) return;

      const pointerEnd: number = event.pageX;
      whenActionUp(pointerEnd);
    },
    [whenActionUp]
  );

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!isDragging.current) return;

      const pointerEnd: number = event.changedTouches[0].clientX;

      whenActionUp(pointerEnd);
    },
    [whenActionUp]
  );

  // Handle poiter move / touch move
  const whenPointerMove = useCallback((pageX: number): void => {
    if (!isDragging.current) return;

    var lengthMouseMoved = pointerStart.current - pageX;

    // Reset transition
    transTime.current = 0;

    setTranslateXCurrent(translateXWhenStart.current + lengthMouseMoved * -1);
  }, []);

  // When poiter move / touch move
  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>): void => {
      if (!isDragging.current) return;
      whenPointerMove(event.pageX);
    },
    [whenPointerMove]
  );

  const onTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>): void => {
      if (!isDragging.current) return;
      whenPointerMove(event.changedTouches[0].clientX);
    },
    [whenPointerMove]
  );

  // When button click
  const onClickNext = (): void => {
    setIndexNext(currentIndex + 1);
  };

  const onClickPrevious = (): void => {
    setIndexNext(currentIndex - 1);
  };

  // run method change width item
  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [changeWidth, itemWidth]);

  return (
    <>
      <div
        ref={sliderRef}
        className={classNames(props.classWrap, "slider", styles.wrap)}
      >
        <motion.div
          onPointerDown={(event) => onPointerDown(event)}
          onPointerMove={(event) => onPointerMove(event)}
          onPointerLeave={(event) => onPointerUp(event)}
          onPointerUp={(event) => onPointerUp(event)}
          onTouchStart={(event) => onTouchDown(event)}
          onTouchMove={(event) => onTouchMove(event)}
          onTouchEnd={(event) => onTouchEnd(event)}
          onTouchCancel={(event) => onTouchEnd(event)}
          className={classNames(styles.view, "slider-view")}
        >
          <motion.div
            layout
            className={classNames(styles.inner, "slider-inner")}
            animate={{
              x: translateXCurrent,
              transition: {
                duration: transTime.current,
                // ease: "spring",
                type: "spring",
              },
            }}
          >
            {Array(props.count)
              .fill(null)
              .map((item, index) => (
                <div
                  key={index}
                  className={classNames(
                    "slider-item",
                    styles.item,
                    index == currentIndex ? styles.current : "",
                    index == currentIndex ? "current" : ""
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
                "slider-btn prev"
              )}
            >
              <IconArrowPrevious />
            </div>
            <div
              onClick={(event) => onClickNext()}
              className={classNames(
                styles.btn,
                styles.btnNext,
                "slider-btn next"
              )}
            >
              <IconArrowNext />
            </div>
          </>
        )}
        {props.isShowFooter && (
          <div className={classNames(styles.footer, "slider-footer")}>
            {Array(props.count - Math.floor(numberItemShow.current) + 1)
              .fill(null)
              .map((value, index) => (
                <div
                  key={index}
                  onClick={(event) => setIndexNext(index)}
                  className={classNames(
                    styles.dot,
                    "slider-dot",
                    index == currentIndex ? styles.current : "",
                    index == currentIndex ? "current" : ""
                  )}
                ></div>
              ))}
          </div>
        )}
        {props.buildThumb && (
          <div className={classNames("slider-thumb-wrap")}>
            {Array(props.count - Math.floor(numberItemShow.current) + 1)
              .fill(null)
              .map((value, index) => (
                <div
                  onClick={(event) => setIndexNext(index)}
                  key={index}
                  className={classNames(
                    "slider-thumb",
                    index == currentIndex ? "current" : ""
                  )}
                >
                  {props.buildThumb && props.buildThumb(index)}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
