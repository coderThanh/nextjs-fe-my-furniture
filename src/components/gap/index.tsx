import AppConst from "@/models/const";
import classNames from "classnames";
import { ReactNode } from "react";
import Responsive from "../responsive";

import styles from "./gap.module.scss";

type GapProps = {
  large: number;
  medium?: number;
  small?: number;
};

export default function Gap(props: GapProps) {
  return (
    <>
      <style jsx>
        {`
          .gap {
            padding-top: ${props.large}px;
          }

          @media only screen and (max-width: ${AppConst.mediaMaxMedium}px) {
            .gap {
              padding-top: ${props.medium ?? props.large}px;
            }
          }

          @media only screen and (max-width: ${AppConst.mediaMaxSmall}px) {
            .gap {
              padding-top: ${props.small ?? props.large}px;
            }
          }
        `}
      </style>
      <div
        data-large={props.large}
        data-medium={props.medium}
        data-small={props.small}
        className={classNames("gap")}
      ></div>
    </>
  );
}
