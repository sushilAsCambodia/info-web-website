import * as React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@/components/svg/home";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
const Footer = () => {
  const { t } = useTranslation();
  let selectedTab = 0;
  const router = useRouter();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  return (
    <>
      <Grid container alignItems="center" flexDirection="column" pt={2} sx={{background:"#FAFAFA"}} >
        <Grid item xs={4} textAlign="center">
          <img src="./assets/Logo/footer_logo.png"/>
          <Typography> {langKey && langKey.footer_content} </Typography>
        </Grid>
        <Grid container item xs={6} py={1} justifyContent="center">
          <Grid className="footerIcon" mx={1} container justifyContent="center" alignItems="center" >
            <Icon width={30} icon="ri:facebook-fill" />
          </Grid>
          <Grid className="footerIcon" mx={1} container justifyContent="center" alignItems="center" >
            <Icon width={30} icon="mdi:twitter" />
          </Grid>
          <Grid className="footerIcon" mx={1} container justifyContent="center" alignItems="center" >
            <Icon width={30} icon="mdi:youtube" />
          </Grid>
          <Grid className="footerIcon" mx={1} container justifyContent="center" alignItems="center" >
            <Icon width={30} icon="ri:instagram-fill" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12} style={{background: '#F3F3F3'}}>
        <Grid container item style={{width:'80%',padding:'10px 0',margin:'0 auto'}}>
          <Grid item xs={6} style={{color: '#777777', fontSize:12, fontWeight:400}}>Copyright © 1996-2021 KK Corporation, All Rights Reserved</Grid>
          <Grid item xs={6} style={{color: '#777777', fontSize:12, fontWeight:400, textAlign:'right'}}>Terms & Conditions  |  Privacy Policy</Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Footer;
