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
import { login, registerWithSocial } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
// import LangSwitcher from "@/components/LangSwitcher";
import { getLanguage } from "../store/actions/languageActions";
import FieldLanguageSwitcher from "@/components/fieldLangSwitcher";
import Cookies from "js-cookie";
import ForgotPassword from "@/components/desktop/forgotPassword";
import utils from "../common/utils";
import { Image } from "mui-image";
import { useSession, signIn, signOut } from "next-auth/react";
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
export default function Login(props) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isComponent, setIsComponent] = useState("login");
  const [loading, setLoading] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUserNameMessage, setErrorUserNameMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [mounted, setMounted] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");
  const [border, setBorder] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );
  const handleSignup = (info) => {
    setLoading(true);
    info.name = info.name.replace(/\s+/, "_");
    dispatch(
      registerWithSocial({
        body: info,
        callback: (res) => {
          if (res) {
            const { status_code, message = "" } = res;
            if ([200, 201, 202, 203].includes(status_code)) {
              matches ? Router.push("/home") : Router.push("/");
            }
          }
        },
      })
    );
  };
  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("remember_me") == "true") {
      setUserName(Cookies.get("user_name"));
      setPassword(Cookies.get("user_pwd"));
      setRememberMe(true);
    }
    if (session) {
      // console.log(session,'xxx')
      // setLoading(true);
      // handleSignup(session);
      // setLoading(true);
    }
  }, [session]);
  const handleLogin = () => {
    dispatch(
      login({
        body: {
          user_name: username,
          password: password,
          remember_me: rememberMe,
        },
        callback: (res) => {
          setLoading(false);
          const { status, status_code, message = "" } = res;
          if ([200, 201, 202, 203].includes(status_code)) {
            // setTimeout(() => {
              //  window.location.href = '/home' : is use for server side  to effect set cookie in middleware
              matches
                ? (window.location.href = window.location.origin + "/home")
                : Router.push("/");
            // }, 4000);
          }else {
            setResponseMessage(t(message.toLowerCase()));
            setOpen(true);
          }
        },
      })
    );
  };
  const goToRegister = () => {
    Router.push("/register");
  };
  const goToForgotPassword = () => {
    if (matches) {
      Router.push("/forgotPassword");
    } else {
      setIsComponent("forgotpassword");
    }
  };
  // Login Dialog
  const [open, setOpen] = React.useState(false);

  const onSubmit = () => {
    if (username == "" && password == "") {
      setErrorUserName(true);
      setErrorPassword(true);
      setErrorUserNameMessage(
        langKey && (langKey.user_name_required || t("user_name_required"))
      );
      setErrorPasswordMessage(
        langKey && (langKey.password_required || t("password_required"))
      );
      return;
    } else if (password == "") {
      setErrorPassword(true);
      setErrorPasswordMessage(
        langKey && (langKey.password_required || t("password_required"))
      );
      return;
    } else if (username == "") {
      setErrorUserNameMessage(
        langKey && (langKey.user_name_required || t("user_name_required"))
      );
      setErrorUserName(true);
      return;
    }
    if (!errorPassword && !errorUserName) {
      setLoading(true);
      handleLogin();
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChangeUserName = (value) => {
    const userName = value.replace(/\s+/g,'');
    const regex = /^[A-Za-z0-9]+$/;
    const validateUsername = regex.test(value);
    if (userName != "" && userName.length < 6) {
      setErrorUserName(true);
      setErrorUserNameMessage(
        langKey && (langKey.validate_user_name || t("validate_user_name"))
      );
    } else if (userName == "") {
      setErrorUserName(true);
      setErrorUserNameMessage(
        langKey && (langKey.user_name_required || t("user_name_required"))
      );
    } else {
      if (!validateUsername) {
        setErrorUserName(true);
        setErrorUserNameMessage(
          langKey &&
            (langKey.username_wrong_format || t("username_wrong_format"))
        );
      } else {
        setErrorUserName(false);
      }
    }
    setUserName(userName);
  };
 
  const onChangePassword = (value) => {
    if (value == '') {
      setErrorPassword(true);
      setErrorPasswordMessage(
        langKey && (langKey.password_required || t("password_required"))
      );
    } else {
      if(utils.checkPassword(value) != null) {
        setErrorPasswordMessage(t(utils.checkPassword(value)));
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
    }
    setPassword(value);
  };
  useEffect(() => {
    if (!errorPassword && !errorUserName && (password!='' && username!='')) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  },[errorPassword,errorUserName,password,username]);
  useEffect(() => {
    if(Object.keys(langKey).length > 0) {
      if(username!='') {
        onChangeUserName(username);
      }
      if(password!='') {
        onChangePassword(password);
      }
    }
  },[langKey]);
  return <>
    {
      mounted && (
        matches ? (
          <>
            <Grid
              container
              alignItems="stretch"
              justifyContent="center"
              height="100%"
            >
              <Grid item container maxWidth="500px" sx={{ minHeight: "500px" }}>
                <Grid
                  item
                  container
                  alignContent="flex-start"
                  xs={12}
                  sm={12}
                  padding={2}
                >
                  <Grid container alignContent="center" minHeight="100px">
                    <Typography
                      variant="h5"
                      sx={{ position: "relative", textTransform: "capitalize" }}
                    >
                      {langKey && (langKey.login || t("login"))}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      boxSizing: "borderBox",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginBottom: "16px",
                      width: "100%",
                    }}
                  >
                    <form className="lnr">
                      <Grid my={7}>
                        <Grid item xs={12} sm={12} mb={3}>
                          <Typography fontWeight="bold" pb={1}>
                            {langKey && (langKey.user_name || t("user_name"))}
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
                              placeholder={
                                langKey && (langKey.user_name || t("user_name"))
                              }
                              inputProps={{ maxLength: 16 }}
                              id="outlined-adornment-username"
                              type="text"
                              value={username}
                              onChange={(e) => onChangeUserName(e.target.value)}
                              error={errorUserName}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle username visibility"
                                    edge="end"
                                  >
                                    <Icon
                                      icon="mdi:user"
                                      width={20}
                                      color="#F26522"
                                    />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            {errorUserName && (
                              <FormHelperText error>
                                {errorUserNameMessage}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} mb={4}>
                          <Typography fontWeight="bold" pb={1}>
                            {langKey && (langKey.password || t("password"))}
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
                              placeholder={
                                langKey && (langKey.password || t("password"))
                              }
                              inputProps={{ maxLength: 16 }}
                              id="outlined-adornment-password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => onChangePassword(e.target.value)}
                              error={errorPassword}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Icon
                                        icon="ph:eye-bold"
                                        color="#F26522"
                                      />
                                    ) : (
                                      <Icon
                                        icon="ri:eye-close-fill"
                                        color="#F26522"
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            {errorPassword && (
                              <FormHelperText error>
                                {errorPasswordMessage}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          disabled={disableSubmit}
                          sx={{
                            color: "white",
                            background: loading
                              ? "linear-gradient(90.04deg, #8C8C8C 0.04%, #D0D0D0 99.97%);"
                              : "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                            textTransform: "capitalize",
                          }}
                          onClick={onSubmit}
                        >
                          {langKey && (langKey.login || t("login"))}
                        </Button>
                      </Grid>

                      <Grid
                        item
                        sm={12}
                        md={12}
                        container
                        sx={{
                          cursor: "pointer",
                          color: "#8C8C8C",
                          fontSize: { xs: "13px", sm: "inerited" },
                          justifyContent: { xs: "center", sm: "center" },
                          marginTop: 2,
                        }}
                        underline="none"
                      >
                        <Link
                          underline="none"
                          style={{
                            cursor: "pointer",
                            color: "#F26522",
                            width: "100%",
                            textAlign: "center",
                            fontSize: "14.5px",
                          }}
                          onClick={goToForgotPassword}
                        >
                          {" "}
                          {langKey &&
                            (langKey.forgot_password || t("forgot_password"))}
                        </Link>
                      </Grid>
                      {/* Social */}
                      {/* <Grid item container spacing={2} mt={1}>
                      <Grid
                        item
                        xs={12}
                        textAlign="center"
                        textTransform="capitalize"
                      >
                        <Typography>{langKey && (langKey.login_via || t('login_via'))}</Typography>
                      </Grid>
                    </Grid> */}

                      {/* <Grid
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
                        <Link underline="none" style={{ cursor: "pointer", color: "#0898D6", padding: "10px" }} ><Icon icon="entypo-social:linkedin-with-circle" fontSize="35px" /></Link>
                      </Grid> */}

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
                            fontSize: "14px",
                            color: "#000",
                            padding: "10px",
                            display: "flex",
                          }}
                          onClick={goToRegister}
                        >
                          {langKey && (langKey.no_account || t("no_account"))}
                          <Typography
                            style={{
                              fontSize: "14px",
                              cursor: "pointer",
                              color: "#F26522",
                            }}
                          >
                            &nbsp;{" "}
                            {langKey && (langKey.register || t("register"))}
                          </Typography>
                        </Link>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <LoadingDialog
              loading={loading}
              setLoading={setLoading}
            ></LoadingDialog>
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
                  {langKey && (langKey.ok || t("ok"))}
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </>
        ) : (
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            overflow="auto"
            sx={{
              backgroundImage: "url('./assets/login/login_bg.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="stretch"
              width={{ xs: "90%", lg: "90%", xl: "1000px" }}
              height="fit-content"
            >
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
                  backgroundPosition: "center",
                }}
                borderRadius="20px 0px 0px 20px"
              >
                <Grid
                  item
                  xs={10}
                  container
                  alignContent="space-between"
                  style={{ margin: 30 }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                    marginTop={"18px"}
                    fontSize={"36px"}
                    lineHeight={"54px"}
                  >
                    {langKey &&
                      (langKey.anytime_anywhere || t("anytime_anywhere"))}
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
                        <Typography
                          fontWeight={700}
                          fontSize="20px"
                          margin={2}
                          textTransform="uppercase"
                        >
                          {langKey &&
                            (langKey.download_app || t("download_app"))}
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
                        <Grid container spacing={2} item xs={12}>
                          <Grid item xs={6} className="mui-iosbtn-wrapper">
                            <Typography component="div" textAlign="center">
                              <Image
                                alt="iosbtn"
                                style={{ maxWidth: 144 }}
                                src="./assets/Home/iosbtn.png"
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={6} className="mui-androidbtn-wrapper">
                            <Typography component="div" textAlign="center">
                              <Image
                                alt="androidbtn"
                                style={{ maxWidth: 144 }}
                                src="./assets/Home/androidbtn.png"
                              />
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
                <Grid item container alignContent="center">
                  <Grid item container xs={12} sm={12} padding={"40px 20px"}>
                    <Grid
                      container
                      justifyContent="center"
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        style={{ width: 150 }}
                        alt="login_logo"
                        src="./assets/Logo/new-logo-white-bg.png"
                      />
                    </Grid>
                    <Grid item xs={12} my={2}>
                      <Divider
                        sx={{
                          "&::before, &::after": {
                            borderColor: "#FF6F31",
                            borderTop: "solid #FF6F31",
                            borderWidth: "2px",
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          textTransform="uppercase"
                        >
                          {isComponent == "forgotpassword"
                            ? langKey &&
                              (langKey.forgotpassword || t("forgotpassword"))
                            : langKey && (langKey.login || t("login"))}
                        </Typography>
                      </Divider>
                    </Grid>
                    {isComponent == "forgotpassword" ? (
                      <ForgotPassword t={t} setIsComponent={setIsComponent} />
                    ) : (
                      <form
                        className="lnr"
                        style={{
                          boxSizing: "borderBox",
                          flexWrap: "wrap",
                          flexDirection: "row",
                          alignItems: "flex-end",
                          marginBottom: "16px",
                          width: "100%",
                          height:'400px'
                        }}
                      >
                        <Grid item xs={12} sm={12} mb={3}>
                          <FieldLanguageSwitcher />
                        </Grid>
                        <Grid item xs={12} sm={12} mb={1}>
                          <FormControl
                            className="errorfreeparent"
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderRadius: "15px",
                              marginBottom: "5px",
                            }}
                          >
                            <InputLabel htmlFor="component-outlined" shrink>
                              {langKey && (langKey.user_name || t("user_name"))}
                            </InputLabel>

                            <OutlinedInput
                              name="Username"
                              placeholder={
                                langKey && (langKey.user_name || t("user_name"))
                              }
                              label={
                                langKey && (langKey.user_name || t("user_name"))
                              }
                              inputProps={{
                                maxLength: 16,
                              }}
                              id="outlined-adornment-username"
                              type="text"
                              value={username || ""}
                              onChange={(e) => onChangeUserName(e.target.value)}
                              error={errorUserName}
                              notched
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle username visibility"
                                    edge="end"
                                  >
                                    <Icon
                                      icon="mdi:user"
                                      width={20}
                                      color="#F26522"
                                    />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            {errorUserName && (
                              <FormHelperText error className="errorfreechild">
                                {errorUserNameMessage}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} mb={3} pt={2}>
                          <FormControl
                            className="errorfreeparent"
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderRadius: "15px",
                              marginBottom: "5px",
                            }}
                          >
                            <InputLabel htmlFor="component-outlined" shrink>
                              {langKey && (langKey.password || t("password"))}
                            </InputLabel>
                            <OutlinedInput
                              name="password"
                              placeholder={
                                langKey && (langKey.password || t("password"))
                              }
                              label={
                                langKey && (langKey.password || t("password"))
                              }
                              inputProps={{ maxLength: 16 }}
                              notched
                              id="outlined-adornment-password"
                              type={showPassword ? "text" : "password"}
                              value={password || ""}
                              onChange={(e) => onChangePassword(e.target.value)}
                              error={errorPassword}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Icon
                                        icon="ph:eye-bold"
                                        color="#F26522"
                                      />
                                    ) : (
                                      <Icon
                                        icon="ri:eye-close-fill"
                                        color="#F26522"
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            {errorPassword && (
                              <FormHelperText error className="errorfreechild">
                                {errorPasswordMessage}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid height="43px"></Grid>
                      <Grid>   
                         <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={rememberMe}
                                  onChange={() => setRememberMe(!rememberMe)}
                                />
                              }
                              label={
                                langKey &&
                                (langKey.remember_me || t("remember_me"))
                              }
                            />
                            <Link
                              underline="none"
                              style={{ cursor: "pointer", color: "#F26522" }}
                              onClick={goToForgotPassword}
                            >
                              <Typography>
                                {langKey &&
                                  (langKey.forgot_password ||
                                    t("forgot_password"))}
                              </Typography>
                            </Link>
                          </Grid>
                        <Grid  container spacing={2} >
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
                              {langKey && (langKey.cancel || t("cancel"))}
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
                              onClick={onSubmit}
                            >
                              {langKey && (langKey.login || t("login"))}
                            </Button>
                          </Grid>
                        </Grid>
                        </Grid>
                        {/* Social */}
                        {/* <Grid
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
                        <Typography onClick={() => signOut()}>{langKey && (langKey.sign_up_with || t('sign_up_with'))}</Typography>
                        <Grid>
                          <Link
                            underline="none"
                            style={{
                              cursor: "pointer",
                              color: "#013B91",
                              padding: "10px",
                            }}
                            onClick={() => signIn("facebook")}
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
                            onClick={() => signIn("google")}
                          >
                            <Icon icon="flat-color-icons:google" fontSize="35px" />
                          </Link>
                        </Grid>
                      </Grid> */}
                      </form>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      borderTop: "1px solid #F3F3F3",
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
                        <Typography>
                          {langKey && (langKey.no_account || t("no_account"))}
                        </Typography>
                        <Typography
                          style={{
                            cursor: "pointer",
                            color: "#F26522",
                          }}
                          mx={1}
                        >
                          {langKey &&
                            (langKey.sign_up_here || t("sign_up_here"))}
                        </Typography>
                      </Link>
                      <Grid
                        display="flex"
                        sx={{ cursor: "pointer" }}
                        onClick={goToForgotPassword}
                      >
                        <Icon icon="bi:chat-square-dots-fill" width={25} />
                        <Typography mx={1}>
                          {langKey &&
                            (langKey.customer_service || t("customer_service"))}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <LoadingDialog
              loading={loading}
              setLoading={setLoading}
            ></LoadingDialog>
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
                  {langKey && (langKey.ok || t("ok"))}
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Grid>
        ))}
    </>
}
