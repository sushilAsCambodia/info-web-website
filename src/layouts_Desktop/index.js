import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import Navigate from "@/components/navigate";
import { Grid, IconButton } from "@mui/material";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language); 
  const matches = useMediaQuery("(max-width:1535px)");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  const { t } = useTranslation();
  let { children } = props;
  let title = "";
  let width = "";
  if (router.pathname != "") {
    width = matches ? "95%" : "80%";
  }
  if (
    router.pathname == "/login" ||
    router.pathname == "/register" ||
    router.pathname == "/forgotPassword" ||
    router.pathname == "/download"
  ) {
    width = "100%";
  }
  switch (router.pathname.toLocaleLowerCase()) {
    case '/':
      title = (langKey && langKey.home_info_web)
      break;
    case '/lotterypage':
      title = (langKey && langKey.lottery_info_web)
      break;
    case '/footballpage':
      title = (langKey && (langKey.football_info_web || t('football_info_web')))
      break;
    case '/basketball':
      title = (langKey && (langKey.basketball_info_web || t('basketball_info_web')))
      break;
    case '/datachart':
      title = (langKey && (langKey.datachart_info_web || t('data_chart_info_web')))
      break; 
    case '/lotterypastresults':
      title = (langKey && (langKey.lottery_past_result_info_web || t('lottery_past_results_info_web')))
      break; 
    case '/profile':
      title = (langKey && langKey.profile_info_web)
      break;
    case '/news':
      title = (langKey && (langKey.news_info_web || t('news_info_web')))
      break;
    case '/announcement':
      title = (langKey && langKey.announcement_info_web)
      break;
    case '/feedback':
      title = (langKey && langKey.feedback_info_web)
      break; 
    case '/newssingle':
      title = (langKey && (langKey.news_single_page_info_web || t('news_single_page_info_web')))
      break;
    case '/login':
      title = (langKey && langKey.login_info_web)
      break;
    case '/register':
      title = (langKey && langKey.register_info_web)
      break;
    case '/forgotpassword':
      title = (langKey && langKey.forgot_password_info_web)
      break;
    default:
      break;
  }
  return (
    mounted && (
      <>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} key="title" />
        </Head>
        <Header />
        <Container
          maxWidth="false"
          sx={{
            bgcolor: "#fff",
            padding: "0px !important",
            // overflowY: 'auto',height: "100%",
          }}
        >
          <main style={{width: width, margin: "auto" }}>
            {" "}
            {children}
          </main>
        </Container>
        <Footer />

        <style jsx global>
          {`
            html,
            body {
              // background: #f9f9f9;
              // font-size: 14px;
            }
            #__next {
              // min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            main {
              flex: 1;
              min-height: 60vh;
            }
            p,
            a {
              // font-family: 'Poppins' !important;
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            }
          `}
        </style>
      </>
    )
  );
};

export default Layout;
