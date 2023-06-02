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
  Dialog,
  Divider,
  FormControlLabel,
  Checkbox,
  InputLabel,
} from "@mui/material";
import Router from "next/router";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import LoadingDialog from "@/components/Loading";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "@/store/actions/authActions";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import FieldLanguageSwitcher from "@/components/fieldLangSwitcher";
import { Image } from "mui-image";
import utils from "@/common/utils";
import ForgotPassword from "@/components/desktop/forgotPassword";
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
const minLength = 4;
export default function Register() {
  const { t } = useTranslation();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorUserNameMessage, setErrorUserNameMessage] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [confirmErrorPasswordMessage, setConfirmErrorPasswordMessage] = useState('');
  const [isComponent, setIsComponent] = useState("login");
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const goToLogin = () => {
    Router.push("/login");
  };
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const matches = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignup = () => {
    dispatch(
      register({
        body: { user_name: username, password: password},
        callback: (res) => {
          setLoading(false);
          const { status_code, message = "" } = res;
          setResponseMessage(t(message));
          setOpen(true);
          if ([200, 201, 202, 203].includes(status_code)) {
            setRegisterSuccess(true);
            dispatch(
              login({
                body: { user_name: username, password: password },
                callback: (res) => {
                  const { status_code } = res;
                  if ([200, 201, 202, 203].includes(status_code)) {
                    matches ? Router.push("/home") : Router.push("/");
                  }
                },
              })
            );
          }
        },
      })
    );
  };
  const onSubmitMobile = () => {
    if (username == "" && password == "") {
      setErrorUserName(true);
      setErrorPassword(true);
      setErrorUserNameMessage(langKey && (langKey.user_name_required || t('user_name_required')));
      setErrorPasswordMessage(langKey && langKey.password_required);
      return;
    } else if (password == "") {
      setErrorPasswordMessage(langKey && (langKey.password_required || t('password_required')));
      setErrorPassword(true);
      return;
    } else if (username == "") {
      setErrorUserNameMessage(langKey && (langKey.user_name_required || t('user_name_required')));
      setErrorUserName(true);
      return;
    }
    if (!errorPassword && !errorUserName) {
      setLoading(true);
      handleSignup();
    }
  };
  const onSubmit = () => {
    if (username == "" && password == "" && confirmPassword == "") {
      setErrorUserName(true);
      setErrorPassword(true);
      setErrorConfirmPassword(true);
      setErrorUserNameMessage(langKey && (langKey.user_name_required || t('user_name_required')));
      setErrorPasswordMessage(langKey && langKey.password_required);
      setConfirmErrorPasswordMessage(langKey && langKey.confirm_password_required);
      return;
    } else if (password == "") {
      setErrorPassword(true);
      return;
    } else if (username == "") {
      setErrorUserName(true);
      setErrorUserNameMessage(langKey && (langKey.user_name_required || t('user_name_required')));
      return;
    }else if (confirmPassword === '') {
      setConfirmErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorConfirmPassword(true);
      return;
    }
    if (!errorPassword && !errorUserName && !errorConfirmPassword) {
      setLoading(true);
      handleSignup();
    }
  };
  const onChangeUserName = (e) => {
    if (e.target.value != "" && e.target.value.length < minLength) {
      setErrorUserName(true);
      setErrorUserNameMessage(langKey && (langKey.validate_user_name || t('validate_user_name')));
    }else if(e.target.value == ''){
      setErrorUserName(true);
      setErrorUserNameMessage(langKey && (langKey.user_name_required || t('user_name_required')));
    } else {
      setErrorUserName(false);
    }
    const userName = e.target.value.replace(/\s+/g,'');
    setUserName(userName);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value == '') {
      setErrorPasswordMessage(langKey && langKey.password_required);
      setErrorPassword(true);
    } else {
      if(utils.checkPassword(e.target.value) != null) {
        setErrorPasswordMessage(t(utils.checkPassword(e.target.value)));
        setErrorPassword(true);
      }else {
        setErrorPassword(false);
      }
    }
    if (confirmPassword != '') { 
      if (confirmPassword != e.target.value) {
        setConfirmErrorPasswordMessage(langKey && langKey.password_is_not_match);
        setErrorConfirmPassword(true);
      } else {
        setErrorConfirmPassword(false);
      }
    }
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value == '') {
      setErrorPasswordMessage(langKey && langKey.confirm_password_required);
      setErrorConfirmPassword(true);
    } else {
      if(utils.checkPassword(e.target.value) != null) {
        setErrorPasswordMessage(t(utils.checkPassword(e.target.value)));
        setErrorConfirmPassword(true);
      }else {
        setErrorConfirmPassword(false);
      }
    }
    if (password != e.target.value) {
      setConfirmErrorPasswordMessage(langKey && langKey.password_is_not_match);
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
    if (e.target.value.length < minLength) {
      setConfirmErrorPasswordMessage(langKey && langKey.validate_password);
      setErrorConfirmPassword(true);
    }
  };
  // Register Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const goToForgotPassword = () => {
    if(matches) {
      Router.push("/forgotPassword");
    }else {
      setIsComponent('forgotpassword');
    }
  };
  return matches ? (
    <>
      <Grid container alignItems="center" justifyContent="center" height="100%">
        <Grid item container maxWidth="500px" sx={{ minHeight: "500px" }}>
          <Grid item container xs={12} sm={12} padding={2}>
            <Grid container alignItems="flex-end" alignContent="center" mb={4}>
              <Typography variant="h5" sx={{ position: "relative" }}>
                {langKey && (langKey.register || t('register'))}
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
               {langKey && (langKey.user_name || t('user_name'))}
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
                    placeholder={langKey && (langKey.user_name || t('user_name'))}
                    inputProps={{ maxLength: 16 }}
                    id="outlined-adornment-username"
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
                      {errorUserNameMessage}
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
                    placeholder={langKey && (langKey.password || t('password'))}
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
                      {errorPasswordMessage}
                    </FormHelperText>
                  )}
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
                      textTransform: "capitalize",
                    }}
                    onClick={onSubmitMobile}
                  >
                    {langKey && (langKey.signup_for_now || t('signup_for_now'))}
                  </Button>
                </Grid>
              </Grid>

              <Grid item container spacing={2} mt={1}>
                <Grid
                  item
                  xs={12}
                  textAlign="center"
                  textTransform="capitalize"
                >
                  <Typography>{langKey && (langKey.signup_via || t('signup_via'))}</Typography>
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
                  onClick={goToLogin}
                >
                  {langKey && (langKey.already_have_an_account || t('already_have_an_account'))}
                  <Typography
                    style={{
                      fontSize: "12px",
                      cursor: "pointer",
                      color: "#F26522",
                    }}
                  >
                    {langKey && (langKey.login || t('login'))}
                  </Typography>
                </Link>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <LoadingDialog loading={loading} setLoading={setLoading}></LoadingDialog>
      {/* Register Dialog */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        id="registerdialog"
      >
        <DialogContent dividers sx={{ maxWidth: "220px", textAlign: "center" }}>
          <Typography>{responseMessage}</Typography>
        </DialogContent>
        {!registerSuccess && (
          <DialogActions>
            <Grid container textAlign="center">
              <Grid
                item
                md={6}
                width="50%"
                sx={{ borderRight: "1px solid #eee" }}
                padding="5px"
                onClick={handleClose}
              >
                {langKey && (langKey.cancel || t('cancel'))}
              </Grid>
              <Grid
                item
                md={6}
                width="50%"
                padding="5px"
                onClick={() => Router.push("/login")}
                sx={{ color: "#0898D6" }}
              >
                {langKey && (langKey.login || t('login'))}
              </Grid>
            </Grid>
          </DialogActions>
        )}
      </BootstrapDialog>
    </>
  ) : (
    <Grid
      display="flex"
      justifyContent="center"
      overflow="auto"
      sx={{ backgroundImage: "url('./assets/login/login_bg.png')", backgroundPosition:'center', backgroundSize:'cover',height:'100%',alignItems:'center' }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        width={{xs:"90%", lg:"90%", xl:"1000px",}}
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
          <Grid item xs={10} container alignContent="space-between" style={{margin:30}}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
              textAlign="center"
              marginTop={'18px'}
              fontSize={'36px'}
              lineHeight={'54px'}
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
                  <Typography fontWeight={700} fontSize="20px" margin={2} textTransform="uppercase">
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
                    container
                    item
                    xs={12}
                    spacing={2}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Grid item xs={6} className="mui-iosbtn-wrapper">
                      <Typography component="div" textAlign="center">
                        <Image alt="iosbtn" style={{maxWidth:144}} src="./assets/Home/iosbtn.png" />
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="div" textAlign="center" className="mui-androidbtn-wrapper">
                        <Image alt="androidbtn" style={{maxWidth:144}} src="./assets/Home/androidbtn.png" />
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
          // py={5}
          sx={{ background: "white" }}
          borderRadius="0px 20px 20px 0px"
        >
          <Grid
            item
            container
            justifyContent="center"
            alignContent="center"
            xs={12} 
          >
            <Grid item container xs={12} sm={12} padding={'40px 20px'}>
              <Grid
                container
                justifyContent="center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  Router.push("/");
                }}
              >
                <Image alt="footer_logo" style={{maxWidth:144}} src="./assets/Logo/footer_logo.png" />
              </Grid>
              <Grid item xs={12} my={2}>
                <Divider
                  sx={{
                    "&::before, &::after": {
                      borderColor: "#FF6F31",
                      borderWidth: '2px'
                    },
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {langKey && (langKey.register || t('register'))}
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
                      // variant="outlined"
                      fullWidth
                      sx={{
                        borderRadius: "15px",
                        marginBottom: "5px",
                      }}
                    >
                      <InputLabel htmlFor="component-outlined" shrink>
                        {langKey && (langKey.user_name || t('user_name'))}
                      </InputLabel>
                      <OutlinedInput
                        name="Username"
                        placeholder={langKey && (langKey.user_name || t('user_name'))}
                        label={langKey && (langKey.user_name || t('user_name'))}
                        inputProps={{ maxLength: 16 }}
                        id="outlined-adornment-username"
                        type="text"
                        notched
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
                          {errorUserNameMessage}
                        </FormHelperText>
                      )}
                    </FormControl>
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
                      <InputLabel htmlFor="component-outlined" shrink>
                        {langKey && (langKey.password || t('password'))}
                      </InputLabel>

                      <OutlinedInput
                        name="password"
                        placeholder={langKey && (langKey.password || t('password'))}
                        label={langKey && (langKey.password || t('password'))}
                        inputProps={{ maxLength: 16 }}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        notched
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
                          {errorPasswordMessage}
                        </FormHelperText>
                      )}
                    </FormControl>
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
                      <InputLabel htmlFor="component-outlined" shrink>
                        {langKey && (langKey.confirm_password || t('confirm_password'))}
                      </InputLabel>

                      <OutlinedInput
                        name="password"
                        placeholder={langKey && (langKey.confirm_password || t('confirm_password'))}
                        label={langKey && (langKey.confirm_password || t('confirm_password'))}
                        inputProps={{ maxLength: 16 }}
                        id="outlined-adornment-confirmpassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        notched
                        onChange={(e) => onChangeConfirmPassword(e)}
                        error={errorConfirmPassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <Icon icon="ri:eye-close-fill" color="#F26522" />
                              ) : (
                                <Icon icon="ph:eye-bold" color="#F26522" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errorConfirmPassword && (
                        <FormHelperText error>
                          {confirmErrorPasswordMessage}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item container spacing={2} mb={3}>
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
                        {langKey && (langKey.cancel || t('cancel'))}
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={loading ? true : false}
                        sx={{
                          whiteSpace:'nowrap',
                          color: "white",
                          background: loading
                            ? "linear-gradient(90.04deg, #8C8C8C 0.04%, #D0D0D0 99.97%);"
                            : "linear-gradient(90.04deg, #FF0000 0.04%, #FF6F31 99.97%);",
                          textTransform: "capitalize",
                        }}
                        onClick={onSubmit}
                      >
                        {langKey && (langKey.signup_for_now || t('signup_for_now'))}
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
                          margin:'2px'
                        }}
                      >
                        <Icon icon="ic:baseline-facebook" fontSize="35px" />
                      </Link>
                      <Link
                        underline="none"
                        style={{
                          cursor: "pointer",
                          color: "#00C2FF",
                          margin:'2px'
                        }}
                      >
                        <Icon icon="flat-color-icons:google" fontSize="35px" />
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
                  onClick={() => {
                    Router.push("/login");
                  }}
                >
                  <Typography>{langKey && (langKey.already_have_an_account || t('already_have_an_account'))}</Typography>
                  <Typography
                    style={{
                      cursor: "pointer",
                      color: "#F26522",
                    }}
                    mx={1}
                  >
                      {langKey && (langKey.sign_in_here || t('sign_in_here'))}
                  </Typography>
                </Link>
                <Grid display="flex" sx={{ cursor: "pointer" }} onClick={goToForgotPassword}>
                  <Icon icon="bi:chat-square-dots-fill" width={25} />
                  <Typography mx={1}>{langKey && (langKey.customer_service || t('customer_service'))}</Typography>
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
  );
}
