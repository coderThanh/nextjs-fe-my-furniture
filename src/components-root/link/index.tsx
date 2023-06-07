import Link from "next/link";
import { Key, ReactNode } from "react";
import { Url } from "url";

export type AppLinkProps = {
  key?: Key;
  url?: Url | string;
  classLink?: string;
  children?: ReactNode;
};

export default function AppLink(props: AppLinkProps): JSX.Element {
  return (
    <>
      {props.url && (
        <Link href={props.url} className={props.classLink}>
          {props.children}
        </Link>
      )}
      {!props.url && <div className={props.classLink}>{props.children}</div>}
    </>
  );
}
