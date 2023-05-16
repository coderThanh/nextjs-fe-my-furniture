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

  const pointerStart = useRef(0);
  const windowWidth = useRef(0);
  const sliderWidth = useRef(0);

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
      setItemWidth(sliderWidth.current / props.md);

      return;
    } else if (windowWidth.current <= AppConst.mediaMaxSmall) {
      setItemWidth(sliderWidth.current / props.sm);
      return;
    }

    setItemWidth(sliderWidth.current / props.lg);
  }, [props.lg, props.md, props.sm]);

  // run method change width item
  useEffect(() => {
    changeWidth();

    window.addEventListener("resize", changeWidth);

    // Component didmount
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [changeWidth, itemWidth]);

  //  Method
  const setChangeNext = useCallback(
    (nextIndex: number) => {
      if (
        nextIndex >
        props.count - Math.floor(sliderWidth.current / itemWidth)
      ) {
        setCurrentIndex(0);
      } else if (nextIndex < 0) {
        setCurrentIndex(props.count - 1);
      } else {
        setCurrentIndex(nextIndex);
      }
    },
    [itemWidth, props.count]
  );

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.pageX;
  }, []);

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const pointerEnd: number = event.pageX;

      if (pointerStart.current - pointerEnd >= 50) {
        setChangeNext(currentIndex + 1);
      } else if (pointerStart.current - pointerEnd <= -50) {
        setChangeNext(currentIndex - 1);
      }
    },
    [currentIndex, setChangeNext]
  );

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      const pointerEnd: number = event.changedTouches[0].clientX;

      if (pointerStart.current - pointerEnd >= 50) {
        setChangeNext(currentIndex + 1);
      } else if (pointerStart.current - pointerEnd <= -50) {
        setChangeNext(currentIndex - 1);
      }
    },
    [currentIndex, setChangeNext]
  );

  const onClickNext = (): void => {
    setChangeNext(currentIndex + 1);
  };

  const onClickPrevious = (): void => {
    setChangeNext(currentIndex - 1);
  };

  return (
    <>
      <div
        ref={sliderRef}
        className={classNames(props.classWrap, "slider", styles.wrap)}
      >
        <motion.div
          onPointerDown={(event) => onPointerDown(event)}
          onPointerUpCapture={(event) => onPointerUp(event)}
          onTouchEnd={(event) => onTouchEnd(event)}
          className={classNames(styles.view)}
        >
          <motion.div
            layout
            className={classNames(styles.inner, "slider-inner")}
            animate={{
              x: currentIndex * itemWidth * -1,
              transition: {
                duration: 0.7,
                type: "spring",
              },
            }}
          >
            {Array(props.count)
              .fill(null)
              .map((item, index) => (
                <div
                  key={index}
                  className={classNames("slider-item", styles.item)}
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
            {Array(props.count)
              .fill(null)
              .map((value, index) => (
                <div
                  key={index}
                  onClick={(event) => setChangeNext(index)}
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
            {Array(props.count)
              .fill(null)
              .map((value, index) => (
                <div
                  onClick={(event) => setChangeNext(index)}
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
