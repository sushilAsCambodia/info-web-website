import React, { useEffect, useState } from "react";
import { 
  Typography, 
  Grid, 
} from "@mui/material";
import Router from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";
export default function ForgotPassword(props) {


  
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  const { t } = useTranslation();
  const { title = (langKey && langKey.forgot_password), showTitle = true} = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const goToLogin = () => {
    Router.push("/login");
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{padding:'5px'}}
      >
      <Grid item md={12}>
        {showTitle && <Typography variant="h5">
          {title||''}
        </Typography>}
        <img src="/assets/Home/customersupport1.png" style={{ maxWidth: "200px", margin:"0 auto", display:"flex" }} />
        <Typography component="h6" fontSize={12} textAlign="center">
          Notify the following ways to contact customer service
        </Typography>
        <Typography component="div" sx={{display:'flex', justifyContent:'center', margin:'5px'}}>
          <Link href="https://t.me/+855762055536" target="_blank">
            <img src="/assets/socials/telegram.png" style={{ width: "40px", height:"40px", objectFit:'cover' }} />
          </Link>
          <Link href="https://wa.me/+855762055536" target="_blank">
            <img src="/assets/socials/whatapp.png" style={{ width: "40px", height:"40px", objectFit:'cover', padding:'3px' }} />
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}