import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Typography,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
} from "@mui/material";
import Router from "next/router";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const goToLogin = () => {
    Router.push("/login");
  };
 
  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="center"
    >
      <Grid
        item
        container
        maxWidth="500px"
        mt={10}
        mb={10}
        sx={{ minHeight: "500px" }}
      >
        <Grid item container xs={12} sm={12} padding={2}>
          <Grid container alignItems="flex-end" alignContent="center" mb={8}>
            <Typography variant="h5" sx={{ position: "relative" }}>
            {t('forgot_password')}
            </Typography>
          </Grid>
          <form
            className="lnr"
            style={{
              boxSizing: "borderBox",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "flex-end",
              marginBottom: "16px",
              width: "100%",
            }}
          >
            <Grid item xs={12} sm={12} mb={3}>
              <Typography fontWeight="bold" pb={1}>
                {t('user_name')}
              </Typography>

              <FormControl
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  marginBottom: "5px",
                }}
              >
                <OutlinedInput
                  name="Username"
                  placeholder={t('user_name')}
                  inputProps={{ maxLength: 16 }}
                  id="outlined-adornment-password"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <Icon icon="mdi:user" width={20} color="#F26522" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
       
            <Grid item container spacing={2} mb={1}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    color: "white",
                    background:
                      "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                    textTransform: 'capitalize'
                  }}
                >
                {t('submit')}
                </Button>
              </Grid>
            </Grid>
           
            
            <Grid item container spacing={2} mt={1}>
              <Grid item xs={12}  >
               <Typography textAlign="center">{t('login_via')}</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sm={12}
              container
              sx={{
                cursor: "pointer",
                color: "#8C8C8C",
                fontSize: { xs: "13px", sm: "inerited" },
                justifyContent: { xs: "center", sm: "center" },
              }}
              underline="none"
            >
                             <Link underline="none" style={{ cursor: "pointer", color: "#013B91", padding: "10px" }} ><Icon icon="ic:baseline-facebook" fontSize="35px" /></Link>
                <Link underline="none" style={{ cursor: "pointer", color: "#00C2FF", padding: "10px" }} ><Icon icon="flat-color-icons:google" fontSize="35px" /></Link>
            </Grid>
            <Grid
              item
              sm={12}
              container
              sx={{
                cursor: "pointer",
                color: "#8C8C8C",
                fontSize: { xs: "13px", sm: "inerited" },
                justifyContent: { xs: "center", sm: "center" },
              }}
              underline="none"
            >
              <Link underline="none" style={{ cursor: "pointer", fontSize:'12px',  color: "#000", padding:"10px", display:'flex' }} onClick={goToLogin} >{t('already_have_an_account')}<Typography style={{fontSize:'12px', cursor: "pointer", color: "#F26522"}}>{t('login')}</Typography></Link>
         
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>

  )
}