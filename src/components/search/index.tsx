import classNames from "classnames";
import { CSSProperties } from "react";
import { IconSearch } from "../icon";
import styles from "./search.module.scss";

export type SearchProp = {
  classForm?: string;
  styleForm?: CSSProperties;
};

export default function Search(props: SearchProp): JSX.Element {
  return (
    <>
      <form action="" className={props.classForm} style={props.styleForm}>
        <div className={classNames(styles.inputWrap, "search-wrap")}>
          <button
            type="submit"
            className={classNames(styles.submit, "search-submit")}
          >
            <IconSearch />
          </button>
          <input
            type="text"
            className={classNames(styles.inputText, "search-input")}
            placeholder="Search"
          />
        </div>
      </form>
    </>
  );
}
