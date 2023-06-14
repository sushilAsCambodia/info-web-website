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
import { Image } from "mui-image";
import Advertisement from "@/common/Advertisement";

export default function Index() {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:768px)");
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  useEffect(() => { 
    dispatch(
      getLanguage(
        {
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language)
          },
          callback:(res) => {
            // console.log("resres",res)
            localStorage.setItem('languageKey', JSON.stringify(res))
          }
        }
      )
    );
},[dispatch,i18n.language]); 

const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


  return !matches ? (
    <>
      <Grid mt={2}>
          {/* <LinkBanner /> */}
        {/* <LandingPageBanner /> */}
        <ResultsBanner lang_id={utils.convertLangCodeToID(i18n.language)}/>

        <Advertisement />
        <NewsColumns lang_id={utils.convertLangCodeToID(i18n.language)}/>
        <JournalsColumns lang_id={utils.convertLangCodeToID(i18n.language)}/>
        <PartnersColumns />
      </Grid>
    </>
  ) : (
    <Container
      sx={{
        backgroundImage: 'url("./assets/Home/homebg1.png")',
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <Grid container justifyContent="center" pt={5}>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Grid item textAlign="center" p={1}  >
          <Typography fontWeight={500} fontSize="24px" maxWidth="260px" width="100%" margin="auto" lineHeight="36px" color="#fff">
              {langKey && langKey.half_slogan_2  ||'Wonderful information in the palm of' }
          </Typography>
          <Typography fontWeight={800} fontSize="39px" style={{textShadow:"0px 3px 1px rgba(0, 0, 0, 0.4)"}} lineHeight="58px" textTransform="uppercase" color="#fff">
              {langKey && langKey.your_hand  ||'YOUR HAND' }
          </Typography>
          </Grid>


          {/* <Grid
            item
            textAlign="center"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "200px",
            }}
          >
            <Typography color="black" fontWeight={700} fontSize="18px" lineHeight="27px"  textTransform="uppercase">
              {langKey && langKey.download_app}
            </Typography>
          </Grid> */}

          {/* <Grid 
            item
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "140px",
            }}
          >
            <Grid item xs={12} display="flex" container spacing={2}>
              <Grid item xs={6} className="mui-iosbtn-wrapper">
                <Typography component="div" textAlign="center">
                  <Image alt="iosbtn" style={{maxWidth:144}} src="./assets/Home/iosbtn.png" />
                </Typography>
              </Grid>
              <Grid item xs={6} className="mui-androidbtn-wrapper">
                <Typography component="div" textAlign="center">
                  <Image alt="androidbtn" style={{maxWidth:144}} src="./assets/Home/androidbtn.png" />
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}

          <Grid
            item
            textAlign="center"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "65px",
            }}
          >
            <Grid>
              <Button href="/home" variant="outlined"style={{textTransform:"initial", borderRadius:"4px", fontSize:"14px"}}>
                 {langKey && langKey.continue_to_home}
                 </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
