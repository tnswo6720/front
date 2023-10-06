// _app.tsx

import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/components/commons/layout";
import AxiosProvider from "../src/components/commons/axios"; // 수정된 부분

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AxiosProvider>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </AxiosProvider> // 수정된 부분
  );
}
