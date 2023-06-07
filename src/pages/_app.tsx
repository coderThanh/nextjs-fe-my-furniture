import "@/styles/material-icon.css";
import "@/styles/reset.css";
import "@/styles/bootstrap-grid.css";
import "@/styles/globals.scss";

import "@/components-child/header/header.scss";
import "@/styles/page/home.scss";
import "@/styles/page/archive.scss";
import "@/styles/page/single.scss";

import type { AppProps } from "next/app";

import Providers from "@/redux/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --primary: #6cd2bc;
          --on-primary: #fff;
          --primary-container: #205e61;
          --on-primary-container: #e5f2ef;

          --secondary: #181823;
          --on-secondary: #fff;
          --secondary-container: #545457;
          --on-secondary-container: #efefef;

          --tertiary: #49c8da;
          --on-tertiary: #fff;
          --tertiary-container: #308f9d;
          --on-tertiary-container: #e6f1f3;

          --error: #d61355;
          --on-error: #fff;
          --error-container: #9d1543;
          --on-error-container: #f6eef1;

          --background: #fff;
          --on-background: #636363;
          --surface: #333946;
          --on-surface: #f6f7f8;

          --color-neutral1: #f6f7f8;
          --color-neutral2: #ccc;
          --color-neutral3: #eeeeee;

          --color-title: #000;
          --color-basic: #333;
          --link-basic: #007bff;
          --link-hover: #6cd2bc;

          --box-shadown1: 3px 0px 7px 1px rgb(0 0 0 / 5%);
          --box-shadown2: 0 0.75rem 6rem rgba(56, 65, 74, 0.03);

          --gap: 15px;

          --button-heigh: 38px;
          --input-height: 40px;
          --opacity-bg: 7%;
          --opacity: 72%;
        }
      `}</style>

      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}
