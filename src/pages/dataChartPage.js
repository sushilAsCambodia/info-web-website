import React from "react";
import {Grid} from "@mui/material";
import {useSelector } from 'react-redux';
import { useRouter } from "next/router";

const DataChartPage = () => {

  const router = useRouter();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  const redirectToHome = (e)=> {
   router.push('/')
  }

  return (
     <>
      <Grid
      container
      alignItems="flex-start"
      justifyContent="center"
      padding="0px 16px">
      <Grid
        item
        xs={12}
        container
        alignContent="flex-start"
        alignItems="center"
        overflow="auto"
      >
        <Grid item xs={12} sm={12} md={12} xl={12} padding="0px" textAlign={'center'}>
          <Grid item xs={12} paddingTop="100px"  onClick={(e)=>redirectToHome(e)} style={{cursor:"pointer"}}>
          <img alt="coming soon" src="./assets/Home/coming-soon-page.jpeg" title={langKey && langKey.home} />
          </Grid>
        </Grid>
      </Grid>
      </Grid>
    </>
  )
};
export default DataChartPage;