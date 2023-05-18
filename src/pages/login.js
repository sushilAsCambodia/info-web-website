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
  Dialog,
  OutlinedInput,
  Card,
  Select,
  Divider,
  Checkbox,
  FormControlLabel,
  InputLabel,
  FilledInput,
} from "@mui/material";
import Router from "next/router";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import FormHelperText from "@mui/material/FormHelperText";
import LoadingDialog from "@/components/Loading";
import { login } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
// import LangSwitcher from "@/components/LangSwitcher";
import {getLanguage} from '../store/actions/languageActions'
import FieldLanguageSwitcher from "@/components/fieldLangSwitcher";
import Cookies from "js-cookie";
import ForgotPassword from "@/components/desktop/forgotPassword";
import utils from "../common/utils";
import { Image } from "mui-image";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;


  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Login() {
  const { t } = useTranslation();
  const {i18n} =  useTranslation();
  const [lang, setLang] = React.useState('')
  const [responseMessage, setResponseMessage] = useState("");
  const [isComponent, setIsComponent] = useState("login");
  const [loading, setLoading] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [mounted, setMounted] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");
  const [border, setBorder] = useState(false);
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language); 
  useEffect(() => {
    setMounted(true);
  },[])
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(
      login({
        body: { user_name: username, password: password },
        callback: (res) => {
          setLoading(false);
          const { status, status_code, message = "" } = res;
          setResponseMessage(t(message.toLowerCase()));
          setOpen(true);
          if ([200, 201, 202, 203].includes(status_code)) {
            setTimeout(() => {
              //  window.location.href = '/home' : is use for server side  to effect set cookie in middleware
              matches ? window.location.href = window.location.origin+'/home' : Router.push("/");
            }, 1);
          }
        },
      })
    );
  };
  const goToRegister = () => {
    Router.push("/register");
  };
  const goToForgotPassword = () => {
    if(matches) {
      Router.push("/forgotPassword");
    }else {
      setIsComponent('forgotpassword');
    }
  };
  // Login Dialog
  const [open, setOpen] = React.useState(false);

  const onSubmit = () => {
    if (username == "" && password == "") {
      setErrorUserName(true);
      setErrorPassword(true);
      return false;
    } else if (password == "") {
      setErrorPassword(true);
      return false;
    } else if (username == "") {
      setErrorUserName(true);
      return false;
    }
    if (!errorPassword && !errorUserName) {
      setLoading(true);
      handleLogin();
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChangeUserName = (e) => {
    if (e.target.value != "" && e.target.value.length < 6) {
      setErrorUserName(true);
    } else {
      setErrorUserName(false);
    }
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    if (e.target.value != "" && e.target.value.length < 6) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    setPassword(e.target.value);
  };

 
  return <>
    {
      mounted && (
        matches ? (
          <>
            <Grid container alignItems="center" justifyContent="center" height="100%">
              <Grid
                item
                container
                maxWidth="500px" 
                sx={{ minHeight: "500px" }}
              >
                <Grid item container xs={12} sm={12} padding={2}>
                  <Grid container alignItems="flex-end" alignContent="center" mb={4}>
                    <Typography variant="h5" sx={{ position: "relative" }}>
                      {langKey && (langKey.login || t('login'))}
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
                {langKey && (langKey.user_name  ||t('user_name'))}
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
                          placeholder= {langKey && (langKey.user_name || t('user_name'))}
                          inputProps={{ maxLength: 16 }}
                          id="outlined-adornment-username"
                          type="text"
                          value={username}
                          onChange={(e) => onChangeUserName(e)}
                          error={errorUserName}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle username visibility"
                                edge="end"
                              >
                                <Icon icon="mdi:user" width={20} color="#F26522" />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errorUserName && (
                          <FormHelperText error>
                           {langKey && (langKey.validate_user_name || t('validate_user_name'))}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} mb={4}>
                      <Typography fontWeight="bold" pb={1}>
                       {langKey && (langKey.password || t('password'))}
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
                          name="password"
                          placeholder= {langKey && (langKey.password || t('password'))}
                          inputProps={{ maxLength: 16 }}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => onChangePassword(e)}
                          error={errorPassword}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Icon icon="ri:eye-close-fill" color="#F26522" />
                                ) : (
                                  <Icon icon="ph:eye-bold" color="#F26522" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errorPassword && (
                          <FormHelperText error>
                     {langKey && (langKey.validate_password || t('validate_password'))}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item container spacing={2} mb={1}>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          variant="contained"
                          disabled={loading ? true : false}
                          sx={{
                            color: "white",
                            background: loading
                              ? "linear-gradient(90.04deg, #8C8C8C 0.04%, #D0D0D0 99.97%);"
                              : "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                            textTransform: "capitalize",
                          }}
                          onClick={onSubmit}
                        >
                         {langKey && (langKey.login || t('login'))}
                        </Button>
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
                      <Link
                        underline="none"
                        style={{ cursor: "pointer", color: "#F26522" }}
                        onClick={goToForgotPassword}
                      >
                        {" "}
                      {langKey && (langKey.forgot_password || t('forgot_password'))}
                      </Link>
                    </Grid>
                    
                    <Grid item container spacing={2} mt={1}>
                      <Grid
                        item
                        xs={12}
                        textAlign="center"
                        textTransform="capitalize"
                      >
                        <Typography>{langKey && (langKey.login_via || t('login_via'))}</Typography>
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
                      <Link
                        underline="none"
                        style={{
                          cursor: "pointer",
                          color: "#013B91",
                          padding: "10px",
                        }}
                      >
                        <Icon icon="ic:baseline-facebook" fontSize="35px" />
                      </Link>
                      <Link
                        underline="none"
                        style={{
                          cursor: "pointer",
                          color: "#00C2FF",
                          padding: "10px",
                        }}
                      >
                        <Icon icon="flat-color-icons:google" fontSize="35px" />
                      </Link>
                      {/* <Link underline="none" style={{ cursor: "pointer", color: "#0898D6", padding: "10px" }} ><Icon icon="entypo-social:linkedin-with-circle" fontSize="35px" /></Link> */}
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
                      <Link
                        underline="none"
                        style={{
                          cursor: "pointer",
                          fontSize: "12px",
                          color: "#000",
                          padding: "10px",
                          display: "flex",
                        }}
                        onClick={goToRegister}
                      >
                     {langKey && (langKey.no_account || t('no_account'))}
                        <Typography
                          style={{
                            fontSize: "12px",
                            cursor: "pointer",
                            color: "#F26522",
                          }}
                        >
                        {langKey && (langKey.register || t('register'))}
                        </Typography>
                      </Link>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <LoadingDialog loading={loading} setLoading={setLoading}></LoadingDialog>
            {/* Login Dialog */}
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              id="logindialog"
            >
              <DialogContent dividers sx={{ maxWidth: "290px" }}>
                <Typography gutterBottom>{responseMessage}</Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                   {langKey && (langKey.ok || t('ok'))}
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </>
        ) : (
          <Grid
            p={{xs:2, md:10}}
            display="flex"
            justifyContent="center"
            sx={{ backgroundImage: "url('./assets/login/login_bg.png')",height:"100vh" }}
          >
            <Grid container justifyContent="center" alignItems="stretch" width={{xs:"1000px", lg:"90%",xl:"65%",}} height="fit-content" >
              <Grid
                container
                justifyContent="center"
                item
                xs={6}
                sx={{
                  // background: "black",
                  backgroundImage: 'url("./assets/login/login.png")',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                borderRadius="20px 0px 0px 20px"
              >
                <Grid item xs={10} container alignContent="space-between" style={{margin:30}}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                  >
                    {langKey && (langKey.anytime_anywhere || t('anytime_anywhere'))}
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                      <Grid
                        item
                        textAlign="center"
                        sx={{
                          left: "0",
                          right: "0",
                          bottom: "150px",
                        }}
                      >
                        <Typography fontWeight={700} fontSize="20px" margin={2}>
                         {langKey && (langKey.download_app || t('download_app'))}
                        </Typography>
                      </Grid>
      
                      <Grid
                        item
                        sx={{
                          left: "0",
                          right: "0",
                          bottom: "90px",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Grid item xs={6}>
                            <Typography textAlign="center">
                              <Image alt="iosbtn" style={{maxWidth: 144}} src="./assets/Home/iosbtn.png" />
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography textAlign="center">
                              <Image alt="androidbtn" style={{maxWidth: 144}} src="./assets/Home/androidbtn.png" />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="flex-start"
                justifyContent="center"
                sx={{ background: "white" }}
                borderRadius="0px 20px 20px 0px"
               
              >
                <Grid
                  item
                  container
                  alignContent="center"
                  // sx={{ minHeight: "500px" }}
                  height={600}
                >
                  <Grid item container xs={12} sm={12} padding={2}>
                  <Grid my={2} container justifyContent="center" style={{cursor:"pointer"}} onClick={()=>{Router.push('/')}}>
                <Image style={{width:139}} alt="footer_logo" src="./assets/Logo/footer_logo.png" />
              </Grid>
                    <Grid item xs={12} mb={2}>
                      <Divider
                        sx={{
                          "&::before, &::after": {
                            borderColor: "#FF6F31",
                            borderTop:'solid #FF6F31',
                            borderWidth:'2px'
                          },
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold" textTransform="uppercase">
                          {isComponent == 'forgotpassword' ? (langKey && (langKey.forgotpassword || t('forgotpassword'))) : (langKey && (langKey.login || t('login')))}
                        </Typography>
                      </Divider>
                    </Grid>
                    {isComponent == 'forgotpassword' ? <ForgotPassword t={t} setIsComponent={setIsComponent}/> : (
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
                        <FieldLanguageSwitcher />
                      </Grid>
                      <Grid item xs={12} sm={12} mb={3}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          sx={{
                            borderRadius: "15px",
                            marginBottom: "5px",
                          }}
                        >
                          <InputLabel htmlFor="component-outlined">
                        {langKey && (langKey.user_name || t('user_name'))}
                          </InputLabel>
      
                          <OutlinedInput
                            name="Username"
                            placeholder= {langKey && (langKey.user_name || t('user_name'))}
                            label={langKey && (langKey.user_name || t('user_name'))}
                            inputProps={{ maxLength: 16 }}
                            id="outlined-adornment-username"
                            type="text"
                            value={username}
                            onChange={(e) => onChangeUserName(e)}
                            error={errorUserName}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle username visibility"
                                  edge="end"
                                >
                                  <Icon icon="mdi:user" width={20} color="#F26522" />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {errorUserName && (
                            <FormHelperText error>
                         {langKey && (langKey.validate_user_name || t('validate_user_name'))}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} mb={4}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          sx={{
                            borderRadius: "15px",
                            marginBottom: "5px",
                          }}
                        >
                          <InputLabel htmlFor="component-outlined">
                       {langKey && (langKey.password || t('password'))}
                          </InputLabel>
                          <OutlinedInput
                            name="password"
                            placeholder= {langKey && (langKey.password || t('password'))}
                            label= {langKey && (langKey.password || t('password'))}
                            inputProps={{ maxLength: 16 }}
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => onChangePassword(e)}
                            error={errorPassword}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Icon icon="ri:eye-close-fill" color="#F26522" />
                                  ) : (
                                    <Icon icon="ph:eye-bold" color="#F26522" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {errorPassword && (
                            <FormHelperText error>
                            {langKey && (langKey.validate_password || t('validate_password'))}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={langKey && (langKey.remember_me || t('remember_me'))}
                        />
                        <Link
                          underline="none"
                          style={{ cursor: "pointer", color: "#F26522" }}
                          onClick={goToForgotPassword}
                        >
                          <Typography>{langKey && (langKey.forgot_password || t('forgot_password'))}</Typography>
                        </Link>
                      </Grid>
                      <Grid item container spacing={2} mb={1}>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            variant="contained"
                            disabled={loading ? true : false}
                            sx={{
                              color: "black",
                              background: "#D4D4D4",
                              textTransform: "capitalize",
                            }}
                            onClick={() => Router.push("/")}
                          >
                      {langKey && (langKey.cancel||t('cancel'))}
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            variant="contained"
                            disabled={loading ? true : false}
                            sx={{
                              color: "white",
                              background: loading
                                ? "linear-gradient(90.04deg, #8C8C8C 0.04%, #D0D0D0 99.97%);"
                                : "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                              textTransform: "capitalize",
                            }}
                            onClick={onSubmit}>
                            {langKey && (langKey.login||t('login'))}
                          </Button>
                        </Grid>
                      </Grid>
      
                      <Grid
                        item
                        xs={12}
                        container
                        sx={{
                          cursor: "pointer",
                          fontSize: { xs: "13px", sm: "inerited" },
                        }}
                        justifyContent="space-between"
                        underline="none"
                        alignItems="center"
                      >
                        <Typography>{langKey && (langKey.sign_up_with || t('sign_up_with'))}</Typography>
                        <Grid>
                          <Link
                            underline="none"
                            style={{
                              cursor: "pointer",
                              color: "#013B91",
                              padding: "10px",
                            }}
                          >
                            <Icon icon="ic:baseline-facebook" fontSize="35px" />
                          </Link>
                          <Link
                            underline="none"
                            style={{
                              cursor: "pointer",
                              color: "#00C2FF",
                              padding: "10px",
                            }}
                          >
                            <Icon icon="flat-color-icons:google" fontSize="35px" />
                          </Link>
                          <Link
                            underline="none"
                            style={{
                              cursor: "pointer",
                              color: "#0898D6",
                              padding: "10px",
                            }}
                          >
                            <Icon
                              icon="entypo-social:twitter-with-circle"
                              fontSize="35px"
                            />
                          </Link>
                        </Grid>
                      </Grid>
                      </form>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      borderTop: "1px solid grey",
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        color: "#8C8C8C",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      px={1}
                      py={1}
                      underline="none"
                    >
                      <Link
                        underline="none"
                        style={{
                          cursor: "pointer",
                          color: "#000",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={goToRegister}
                      >
                        <Typography>{langKey && (langKey.no_account || t('no_account'))}</Typography>
                        <Typography
                          style={{
                            cursor: "pointer",
                            color: "#F26522",
                          }}
                          mx={1}
                        >
                          {langKey && (langKey.sign_up_here || t('sign_up_here'))}
                        </Typography>
                      </Link>
                      <Grid display="flex" sx={{ cursor: "pointer" }}>
                        <Icon icon="bi:chat-square-dots-fill" width={25} />
                        <Typography mx={1}>{langKey && (langKey.contact ||  t('contact'))}</Typography>
                      </Grid>
                    </Grid> 
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <LoadingDialog loading={loading} setLoading={setLoading}></LoadingDialog>
            {/* Login Dialog */}
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              id="logindialog"
            >
              <DialogContent dividers sx={{ maxWidth: "290px" }}>
                <Typography gutterBottom>{responseMessage}</Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
               {langKey && (langKey.ok || t('ok'))}
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Grid>
        )
      )
    }
  </>
}
