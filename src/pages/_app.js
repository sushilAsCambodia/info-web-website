import { useEffect } from "react";

import "@/styles/globals.css";
import ThemConfiguration from "../config/themeConfiguration";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "@/common/i18n";
import Layout from "@/layouts";
import Layout_D from "@/layouts_Desktop";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SessionProvider } from "next-auth/react"

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const { i18n } = useTranslation();
  const matches = useMediaQuery("(max-width:768px)");
  useEffect(() => {
    if (typeof window != "undefined") {
      const lang = window.localStorage.getItem("lang") || "en";
      i18n.changeLanguage(lang);
    }
  }, [i18n]);
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ThemeProvider theme={ThemConfiguration()}>
              {matches ? (
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              ) : (
                <Layout_D {...pageProps}>
                  <Component {...pageProps} />
                </Layout_D>
              )}
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </>
  );
};
export default App;
