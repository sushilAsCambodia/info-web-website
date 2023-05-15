import { useEffect, useState } from "react";
import {
  Grid,
  List,
  ListItem,
  Card,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import NewsColumns from "@/components/homeNews/NewsColumns";
import JournalsColumns from "@/components/homeNews/JournalsColumns";
import PartnersColumns from "@/components/homeNews/PartnersColumns";
import LandingPageBanner from "@/common/LandingPageBanner";
import ResultsBanner from "@/components/homeNews/ResultsBanner";
import {getLanguage} from '../store/actions/languageActions'
import LinkBanner from "@/components/homeNews/LinkBanner";
import Header from "@/layouts_Desktop/header";
import Footer from "@/layouts_Desktop/footer";
import { useTranslation } from "react-i18next";

import utils from "@/common/utils";

export default function Index() {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:768px)");
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  useEffect(() => { 
    dispatch(getLanguage(
        {
            params: {
                lang_id: utils.convertLangCodeToID(i18n.language)
            },
            callback:(res) => {
// console.log("resres",res)
localStorage.setItem('languageKey', JSON.stringify(res))

             }
        }
    ));
  
},[i18n.language]); 

const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


  return !matches ? (
    <>
      <Grid mt={2}>
        <ResultsBanner lang_id={utils.convertLangCodeToID(i18n.language)}/>
        {/* <LinkBanner /> */}
        <LandingPageBanner />
        <NewsColumns lang_id={utils.convertLangCodeToID(i18n.language)}/>
        <JournalsColumns lang_id={utils.convertLangCodeToID(i18n.language)}/>
        <PartnersColumns />
      </Grid>
    </>
  ) : (
    <Container
      sx={{
        backgroundImage: 'url("./assets/Home/landingpagebg.jpg")',
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Grid
            item
            textAlign="center"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "150px",
            }}
          >
            <Typography fontWeight={700} fontSize="20px">
              {langKey && langKey.download_app}
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "90px",
            }}
          >
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Grid item xs={6}>
                <Typography textAlign="center">
                  <img src="./assets/Home/iosbtn.png" />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign="center">
                  <img src="./assets/Home/androidbtn.png" />
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            textAlign="center"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "20px",
            }}
          >
            <Grid item>
              <Link href="/home">
                <Typography fontWeight={700} fontSize="15px" color="#1639e5">
              {langKey && langKey.continue_to_home}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
